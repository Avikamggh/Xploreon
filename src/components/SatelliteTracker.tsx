// src/components/SatelliteTracker.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap, Marker, Polyline } from "leaflet";
import * as satellite from "satellite.js";
import { Link } from "react-router-dom";

const CONFIG = {
  UPDATE_EVERY_MS: 1000,
  ORBIT_POINTS: 90,
};

// Uses your Netlify function to avoid CORS
const TLE_SOURCES: Record<string, string> = {
  stations: "/.netlify/functions/tle-proxy?group=stations",
  visual:   "/.netlify/functions/tle-proxy?group=visual",
};

type TLERow = { name: string; tle1: string; tle2: string; noradId: number };

export default function SatelliteTracker() {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const orbitRef  = useRef<Polyline | null>(null);

  const [tleData, setTleData] = useState<TLERow[]>([]);
  const [selectedId, setSelectedId] = useState<number | "">("");
  const [panelHtml, setPanelHtml] = useState<string>("");

  useEffect(() => { document.title = "Xploreon | Live Satellite Tracker"; }, []);

  // Init map once
  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return;
    const map = L.map(mapElRef.current, { worldCopyJump: true }).setView([0, 0], 2);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "© Esri" }
    ).addTo(map);
    mapRef.current = map;
  }, []);

  // Fetch TLEs (server-side via Netlify function)
  useEffect(() => {
    const fetchAll = async () => {
      const all: TLERow[] = [];
      for (const key of Object.keys(TLE_SOURCES) as (keyof typeof TLE_SOURCES)[]) {
        try {
          const r = await fetch(TLE_SOURCES[key]);
          const text = await r.text();
          const lines = text.split("\n").map(s => s.trim()).filter(Boolean);
          for (let i = 0; i + 2 < lines.length; i += 3) {
            const name = lines[i], tle1 = lines[i+1], tle2 = lines[i+2];
            const m = tle1.match(/^1 (\d+)/);
            if (!m) continue;
            all.push({ name, tle1, tle2, noradId: parseInt(m[1], 10) });
          }
        } catch (e) { console.error("TLE fetch failed:", e); }
      }
      const uniq = all.filter((s, i, a) => a.findIndex(x => x.noradId === s.noradId) === i);
      setTleData(uniq);
      const iss = uniq.find(s => /ISS/i.test(s.name));
      if (iss) setSelectedId(iss.noradId);
    };
    fetchAll();
  }, []);

  // Update loop for selected satellite
  useEffect(() => {
    if (!selectedId || !mapRef.current) {
      // Clear marker/orbit and show placeholder in panel
      if (markerRef.current) { mapRef.current?.removeLayer(markerRef.current); markerRef.current = null; }
      if (orbitRef.current)  { mapRef.current?.removeLayer(orbitRef.current);  orbitRef.current  = null; }
      setPanelHtml(`<div class="panel-heading">Satellite</div>
        <div class="panel-placeholder">Select a satellite to see live details.</div>`);
      return;
    }

    const row = tleData.find(s => s.noradId === selectedId);
    if (!row) return;

    const map = mapRef.current!;
    const satrec = satellite.twoline2satrec(row.tle1, row.tle2);

    const tick = () => {
      const now = new Date();
      const p = satellite.propagate(satrec, now);
      if (!p.position) return;

      const geo = satellite.eciToGeodetic(p.position, satellite.gstime(now));
      const lat = satellite.degreesLat(geo.latitude);
      const lon = satellite.degreesLong(geo.longitude);
      const altKm = geo.height;
      const speedKmh = calcSpeedKmh(satrec, now);
      const orbitType = altKm > 35000 ? "Geostationary" : "Low Earth Orbit";

      // marker 🛰️
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lon]);
      } else {
        markerRef.current = L.marker([lat, lon], {
          icon: L.divIcon({
            className: "sat-emoji",
            html: "🛰️",
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          }),
          interactive: false,
        }).addTo(map);
      }

      // orbit preview
      const pts = getOrbitPoints(satrec);
      if (orbitRef.current) {
        orbitRef.current.setLatLngs(pts);
      } else {
        orbitRef.current = L.polyline(pts, {
          color: "#00ffe0", weight: 2, opacity: 0.7, dashArray: "5,5",
        }).addTo(map);
      }

      // info inside same panel (top-right)
      setPanelHtml(`
        <div class="panel-heading">${escapeHtml(row.name)}</div>
        <div class="kv"><span>Latitude</span><b>${lat.toFixed(2)}°</b></div>
        <div class="kv"><span>Longitude</span><b>${lon.toFixed(2)}°</b></div>
        <div class="kv"><span>Altitude</span><b>${altKm.toFixed(2)} km</b></div>
        <div class="kv"><span>Speed</span><b>${speedKmh} km/h</b></div>
        <div class="kv"><span>Orbit</span><b>${orbitType}</b></div>
      `);
    };

    tick();
    const t = window.setInterval(tick, CONFIG.UPDATE_EVERY_MS);
    return () => clearInterval(t);
  }, [selectedId, tleData]);

  const options = useMemo(
    () => tleData
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(s => <option key={s.noradId} value={s.noradId}>{s.name}</option>),
    [tleData]
  );

  return (
    <div className="relative">
      {/* unified panel (selector + live stats) */}
      <div className="fixed top-4 right-4 z-[1000] w-80 bg-black/80 backdrop-blur rounded-xl border border-cyan-400/30 p-4 text-sm text-cyan-100 shadow-xl">
        <label className="block text-cyan-300 mb-2 text-xs tracking-wide">Select Satellite</label>
        <select
          className="w-full mb-3 px-3 py-2 rounded bg-gray-900 text-cyan-300 outline-none border border-cyan-500/30"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value ? parseInt(e.target.value, 10) : "")}
        >
          <option value="">-- Select --</option>
          {options}
        </select>

        <div dangerouslySetInnerHTML={{ __html: panelHtml }} />
      </div>

      {/* back button bottom center */}
      <Link
        to="/"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] px-4 py-2 rounded-lg
                   bg-cyan-400 text-black font-semibold shadow-lg hover:bg-cyan-300 transition"
      >
        ← Back to Home
      </Link>

      {/* map */}
      <div ref={mapElRef} style={{ height: "100vh", width: "100%" }} />

      <style>{`
        .sat-emoji { font-size: 24px; text-align:center; filter: drop-shadow(0 0 8px #00ffe0); }
        .panel-heading {
          color:#00ffe0; font-weight:700; margin:8px 0 4px; font-size:14px; text-shadow:0 0 8px #00ffe0;
        }
        .panel-placeholder { color:#9adff0; font-size:12px; padding:6px 0 2px; }
        .kv { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px dashed rgba(0,255,224,0.25); }
        .kv:last-child { border-bottom:0; }
        .kv span { color:#8fd9e6; }
        .kv b { color:#ffffff; font-weight:600; }
      `}
        .leaflet-control-attribution {
         display: none !important;
       }

      </style>
    </div>
  );
}

/* ---------- helpers ---------- */
function getOrbitPoints(satrec: any) {
  const pts: [number, number][] = [];
  const now = new Date();
  for (let i = 0; i < CONFIG.ORBIT_POINTS; i++) {
    const t = new Date(now.getTime() + i * 60 * 1000);
    const p = satellite.propagate(satrec, t);
    if (!p.position) continue;
    const g = satellite.eciToGeodetic(p.position, satellite.gstime(t));
    pts.push([satellite.degreesLat(g.latitude), satellite.degreesLong(g.longitude)]);
  }
  return pts;
}

function calcSpeedKmh(satrec: any, time: Date) {
  try {
    const p1 = satellite.propagate(satrec, time);
    const p2 = satellite.propagate(satrec, new Date(time.getTime() + 1000));
    if (p1.position && p2.position) {
      const dx = p2.position.x - p1.position.x;
      const dy = p2.position.y - p1.position.y;
      const dz = p2.position.z - p1.position.z;
      const d  = Math.sqrt(dx*dx + dy*dy + dz*dz); // km per second
      return (d * 3600).toFixed(2); // km/h
    }
  } catch {}
  return "0";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]!));
}
