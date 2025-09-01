import React, { useEffect, useMemo, useRef, useState } from "react";
import { Section, Card } from "./ui";
import { MapContainer, TileLayer, Polyline, Circle, CircleMarker, useMap } from "react-leaflet";
import * as satellite from "satellite.js";
import "leaflet/dist/leaflet.css";

type LatLng = { lat: number; lng: number };
const EARTH_RADIUS_M = 6378137;

function toDeg(rad: number) { return rad * 180 / Math.PI; }
function toRad(deg: number) { return deg * Math.PI / 180; }
function clamp(v: number, min: number, max: number) { return Math.min(max, Math.max(min, v)); }

function parseTLE(tleText: string) {
  const lines = tleText.split("\n").map(s => s.trim()).filter(Boolean);
  if (lines.length >= 3 && lines[1].startsWith("1 ") && lines[2].startsWith("2 "))
    return { name: lines[0], l1: lines[1], l2: lines[2] };
  const l1 = lines.find(l => l.startsWith("1 "));
  const l2 = lines.find(l => l.startsWith("2 "));
  if (l1 && l2) return { l1, l2 };
  return null;
}

function getLatLngAlt(satrec: satellite.SatRec, date: Date) {
  const pv = satellite.propagate(satrec, date);
  if (!pv.position) return null;
  const gmst = satellite.gstime(date);
  const geodetic = satellite.eciToGeodetic(pv.position, gmst);
  let lng = toDeg(geodetic.longitude);
  lng = ((lng + 180) % 360) - 180;
  return { lat: toDeg(geodetic.latitude), lng, altKm: geodetic.height };
}

function groundTrackSegments(points: LatLng[]): LatLng[][] {
  const segs: LatLng[][] = [];
  let current: LatLng[] = [];
  points.forEach((pt, i) => {
    if (i > 0) {
      const prev = points[i - 1];
      if (Math.abs(pt.lng - prev.lng) > 180) {
        segs.push(current);
        current = [];
      }
    }
    current.push(pt);
  });
  if (current.length) segs.push(current);
  return segs;
}

function footprintRadiusMeters(altKm: number) {
  const Re = EARTH_RADIUS_M;
  const h = Math.max(0, altKm * 1000);
  const alpha = Math.acos(clamp(Re / (Re + h), -1, 1));
  return Re * alpha;
}

const CenterOn: React.FC<{ pos?: LatLng }> = ({ pos }) => {
  const map = useMap();
  useEffect(() => { if (pos) map.setView([pos.lat, pos.lng]); }, [pos, map]);
  return null;
};

const Tracker: React.FC = () => {
  const [satrec, setSatrec] = useState<satellite.SatRec | null>(null);
  const [satName, setSatName] = useState("Satellite");
  const [nowPos, setNowPos] = useState<{ lat: number; lng: number; altKm: number } | null>(null);
  const [pastTrack, setPastTrack] = useState<LatLng[]>([]);
  const [futureTrack, setFutureTrack] = useState<LatLng[]>([]);

  // Fetch TLE automatically (using Netlify function)
  useEffect(() => {
    async function loadTLE() {
      try {
        const res = await fetch("/.netlify/functions/tle-fetch?id=25544");
        const text = await res.text();
        const parsed = parseTLE(text);
        if (parsed) {
          const rec = satellite.twoline2satrec(parsed.l1, parsed.l2);
          setSatrec(rec);
          setSatName(parsed.name || "Satellite");
        }
      } catch (e) {
        console.error("TLE fetch failed", e);
      }
    }
    loadTLE();
  }, []);

  // Update position every second
  useEffect(() => {
    if (!satrec) return;
    const tick = () => {
      const pos = getLatLngAlt(satrec, new Date());
      if (pos) setNowPos(pos);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [satrec]);

  // Recompute ground track
  useEffect(() => {
    if (!satrec) return;
    const now = new Date();
    const past: LatLng[] = [];
    const future: LatLng[] = [];
    for (let s = 30 * 60; s >= 0; s -= 30) {
      const d = new Date(now.getTime() - s * 1000);
      const pos = getLatLngAlt(satrec, d);
      if (pos) past.push({ lat: pos.lat, lng: pos.lng });
    }
    for (let s = 10; s <= 90 * 60; s += 30) {
      const d = new Date(now.getTime() + s * 1000);
      const pos = getLatLngAlt(satrec, d);
      if (pos) future.push({ lat: pos.lat, lng: pos.lng });
    }
    setPastTrack(past);
    setFutureTrack(future);
  }, [satrec, nowPos]);

  const footRadius = useMemo(() => nowPos ? footprintRadiusMeters(nowPos.altKm) : 0, [nowPos]);

  return (
    <Section title="Mission Tracker" subtitle="Live satellite position and ground track">
      <Card>
        <div className="h-[520px] w-full rounded-xl overflow-hidden">
          <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {nowPos && (
              <>
                <CenterOn pos={{ lat: nowPos.lat, lng: nowPos.lng }} />
                <CircleMarker center={[nowPos.lat, nowPos.lng]} radius={6} />
                {footRadius > 0 && <Circle center={[nowPos.lat, nowPos.lng]} radius={footRadius} pathOptions={{ opacity: 0.3 }} />}
              </>
            )}
            {groundTrackSegments(pastTrack).map((seg, i) => (
              <Polyline key={`past-${i}`} positions={seg.map(p => [p.lat, p.lng] as [number, number])} pathOptions={{ dashArray: "6 6" }} />
            ))}
            {groundTrackSegments(futureTrack).map((seg, i) => (
              <Polyline key={`fut-${i}`} positions={seg.map(p => [p.lat, p.lng] as [number, number])} />
            ))}
          </MapContainer>
        </div>
        <div className="mt-3 text-sm">
          <div>Satellite: <strong>{satName}</strong></div>
          {nowPos && (
            <div className="mt-1 grid grid-cols-2 gap-2">
              <div>Lat: {nowPos.lat.toFixed(3)}°</div>
              <div>Lng: {nowPos.lng.toFixed(3)}°</div>
              <div>Alt: {nowPos.altKm.toFixed(2)} km</div>
              <div>Footprint: {(footRadius / 1000).toFixed(0)} km</div>
            </div>
          )}
        </div>
      </Card>
    </Section>
  );
};

export default Tracker;
