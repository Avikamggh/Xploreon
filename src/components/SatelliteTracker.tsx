import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap, Marker, Polyline } from "leaflet";
import * as satellite from "satellite.js";
import { Link } from "react-router-dom";

const CONFIG = {
  UPDATE_INTERVAL: 1000, // 1 second
  ORBIT_POINTS: 90,      // 90 minutes of orbit path
};

const TLE_SOURCES: Record<string, string> = {
  stations: "/.netlify/functions/tle-proxy?group=stations",
  visual: "/.netlify/functions/tle-proxy?group=visual",
};

type TLERow = {
  name: string;
  tle1: string;
  tle2: string;
  noradId: number;
};

export default function SatelliteTracker() {
  const mapRef = useRef<LeafletMap | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const orbitRef = useRef<Polyline | null>(null);

  const [tleData, setTleData] = useState<TLERow[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [info, setInfo] = useState<string>("Select a satellite to begin tracking...");

  useEffect(() => {
    document.title = "Xploreon | Live Satellite Tracker";
  }, []);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { worldCopyJump: true }).setView([0, 0], 2);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "© Esri" }
    ).addTo(map);
    mapRef.current = map;
  }, []);

  // Fetch TLE
  useEffect(() => {
    const fetchTLE = async () => {
      const all: TLERow[] = [];
      for (const key of Object.keys(TLE_SOURCES) as (keyof typeof TLE_SOURCES)[]) {
        try {
          const resp = await fetch(TLE_SOURCES[key]);
          const text = await resp.text();
          const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
          for (let i = 0; i < lines.length; i += 3) {
            if (i + 2 >= lines.length) break;
            const name = lines[i];
            const tle1 = lines[i + 1];
            const tle2 = lines[i + 2];
            const match = tle1.match(/^1 (\d+)/);
            if (!match) continue;
            all.push({ name, tle1, tle2, noradId: parseInt(match[1], 10) });
          }
        } catch (e) {
          console.error("TLE fetch failed", e);
        }
      }
      setTleData(all);
    };
    fetchTLE();
  }, []);

  // Update position of selected satellite
  useEffect(() => {
    if (!selectedId || !mapRef.current) return;

    const row = tleData.find((s) => s.noradId === selectedId);
    if (!row) return;

    const update = () => {
      const now = new Date();
      const satrec = satellite.twoline2satrec(row.tle1, row.tle2);
      const pos = satellite.propagate(satrec, now);
      if (!pos.position) return;
      const geo = satellite.eciToGeodetic(pos.position, satellite.gstime(now));
      const lat = satellite.degreesLat(geo.latitude);
      const lon = satellite.degreesLong(geo.longitude);
      const alt = geo.height;
      const speed = calcSpeedKmh(satrec, now);
      const orbitType = alt > 35000 ? "Geostationary" : "Low Earth Orbit";

      // Marker (🛰️ emoji)
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]);
      } else {
        markerRef.current = L.marker([lat, lon], {
          icon: L.divIcon({
            className: "satellite-icon",
            html: "🛰️",
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          }),
        }).addTo(mapRef.current!);
      }

      // Orbit path
      const orbit = getOrbit(satrec);
      if (orbitRef.current) {
        orbitRef.current.setLatLngs(orbit);
      } else {
        orbitRef.current = L.polyline(orbit, { color: "#00ffe0", weight: 2 }).addTo(mapRef.current!);
      }

      // Info panel
      setInfo(`
        <b>${row.name}</b><br/>
        Latitude: ${lat.toFixed(2)}°<br/>
        Longitude: ${lon.toFixed(2)}°<br/>
        Altitude: ${alt.toFixed(2)} km<br/>
        Speed: ${speed} km/h<br/>
        Orbit: ${orbitType}
      `);
    };

    update();
    const timer = setInterval(update, CONFIG.UPDATE_INTERVAL);
    return () => clearInterval(timer);
  }, [selectedId, tleData]);

  const options = useMemo(
    () => tleData.map((s) => <option key={s.noradId} value={s.noradId}>{s.name}</option>),
    [tleData]
  );

  return (
    <div className="relative">
      {/* Back Button */}
      <Link
        to="/"
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                   px-4 py-2 rounded-lg bg-cyan-400 text-black font-semibold shadow-lg z-[1000]"
      >
        ← Back to Home
      </Link>

      {/* Dropdown */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 p-3 rounded-lg z-[1000]">
        <select
          className="px-3 py-2 rounded bg-gray-800 text-cyan-400"
          onChange={(e) => setSelectedId(parseInt(e.target.value))}
        >
          <option value="">-- Select Satellite --</option>
          {options}
        </select>
      </div>

      {/* Info Panel */}
      <div
        className="absolute top-20 right-4 bg-black/80 text-cyan-300 p-4 rounded-lg w-64 text-sm shadow-lg"
        dangerouslySetInnerHTML={{ __html: info }}
      />

      {/* Map */}
      <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />

      <style>{`
        .satellite-icon {
          font-size: 22px;
          text-align: center;
          filter: drop-shadow(0 0 8px #00ffe0);
        }
      `}</style>
    </div>
  );
}

// Helpers
function getOrbit(satrec: any) {
  const points: [number, number][] = [];
  const now = new Date();
  for (let i = 0; i < CONFIG.ORBIT_POINTS; i++) {
    const t = new Date(now.getTime() + i * 60 * 1000);
    const pos = satellite.propagate(satrec, t);
    if (!pos.position) continue;
    const geo = satellite.eciToGeodetic(pos.position, satellite.gstime(t));
    points.push([satellite.degreesLat(geo.latitude), satellite.degreesLong(geo.longitude)]);
  }
  return points;
}

function calcSpeedKmh(satrec: any, time: Date) {
  try {
    const p1 = satellite.propagate(satrec, time);
    const p2 = satellite.propagate(satrec, new Date(time.getTime() + 1000));
    if (p1.position && p2.position) {
      const dx = p2.position.x - p1.position.x;
      const dy = p2.position.y - p1.position.y;
      const dz = p2.position.z - p1.position.z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      return (d * 3600).toFixed(2);
    }
  } catch {}
  return "0";
}
