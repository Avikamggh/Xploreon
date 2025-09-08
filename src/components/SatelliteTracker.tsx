import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap, TileLayer, Polyline, Marker } from "leaflet";
import * as satellite from "satellite.js";
import { Link } from "react-router-dom";

// ---------------------- Config ----------------------
const CONFIG = {
  TLE_UPDATE_INTERVAL: 6 * 60 * 60 * 1000, // 6h
  POSITION_UPDATE_INTERVAL: 1000,          // 1s
  MAX_SATELLITES: 30,
  ORBIT_POINTS: 60,
};

const TLE_SOURCES: Record<string, string> = {
  stations: "/.netlify/functions/tle-proxy?group=stations",
  weather: "/.netlify/functions/tle-proxy?group=weather",
  noaa: "/.netlify/functions/tle-proxy?group=noaa",
  visual: "/.netlify/functions/tle-proxy?group=visual",
};

const FEATURED_SATELLITES: Record<number, { name: string; icon: string }> = {
  25544: { name: "ISS (International Space Station)", icon: "🏠" },
  48274: { name: "TIANGONG (Chinese Space Station)", icon: "🏛️" },
  20580: { name: "Hubble Space Telescope", icon: "🔭" },
  33591: { name: "NOAA 19 (Weather)", icon: "🌦️" },
};

// ---------------------- Types ----------------------
type TLERow = {
  name: string;
  icon: string;
  noradId: number;
  tle1: string;
  tle2: string;
};
type MarkerPair = { icon: Marker; label: Marker };

// ---------------------- Component ----------------------
export default function SatelliteTracker() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  const tleDataRef = useRef<TLERow[]>([]);
  const markersRef = useRef<MarkerPair[]>([]);
  const orbitsRef = useRef<Polyline[]>([]);

  const [tleStatus, setTleStatus] = useState("Loading TLE data...");
  const [satCount, setSatCount] = useState<number>(0);

  useEffect(() => { document.title = "Xploreon | Enhanced Satellite Tracker"; }, []);

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current).setView([0, 0], 2);
    mapRef.current = map;

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "© Esri" }
    ).addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Parse TLE
  const parseTLE = (tleText: string): TLERow[] => {
    const lines = tleText.split("\n").map((l) => l.trim()).filter(Boolean);
    const out: TLERow[] = [];
    for (let i = 0; i < lines.length; i += 3) {
      if (i + 2 >= lines.length) break;
      const name = lines[i];
      const tle1 = lines[i + 1];
      const tle2 = lines[i + 2];
      const match = tle1.match(/^1 (\d+)/);
      if (!match) continue;
      const noradId = parseInt(match[1], 10);
      const featured = FEATURED_SATELLITES[noradId];
      out.push({
        name: featured ? featured.name : name.trim(),
        icon: featured ? featured.icon : "🛰️",
        noradId,
        tle1,
        tle2,
      });
    }
    return out;
  };

  // Fetch TLE
  const updateTLE = async () => {
    setTleStatus("Fetching satellites...");
    try {
      const all: TLERow[] = [];
      for (const key of Object.keys(TLE_SOURCES) as (keyof typeof TLE_SOURCES)[]) {
        const resp = await fetch(TLE_SOURCES[key]);
        const text = await resp.text();
        all.push(...parseTLE(text));
      }
      tleDataRef.current = all;
      setSatCount(all.length);
      setTleStatus(`Loaded ${all.length} satellites`);
    } catch (err: any) {
      setTleStatus(`Error: ${err.message}`);
    }
  };

  // Draw satellites
  const drawOrUpdate = () => {
    const map = mapRef.current;
    if (!map) return;
    const now = new Date();

    tleDataRef.current.forEach((row, i) => {
      try {
        const satrec = satellite.twoline2satrec(row.tle1, row.tle2);
        const pos = satellite.propagate(satrec, now);
        if (!pos.position) return;
        const geo = satellite.eciToGeodetic(pos.position, satellite.gstime(now));
        const lat = satellite.degreesLat(geo.latitude);
        const lon = satellite.degreesLong(geo.longitude);

        if (markersRef.current[i]) {
          markersRef.current[i].icon.setLatLng([lat, lon]);
          markersRef.current[i].label.setLatLng([lat - 1, lon]);
        } else {
          const iconMarker = L.marker([lat, lon], {
            icon: L.divIcon({ className: "satellite-icon", html: row.icon, iconSize: [24, 24], iconAnchor: [12, 12] }),
          }).addTo(map);
          const labelMarker = L.marker([lat - 1, lon], {
            icon: L.divIcon({ className: "satellite-label", html: row.name, className: "text-white text-xs" }),
          }).addTo(map);
          markersRef.current[i] = { icon: iconMarker, label: labelMarker };
        }
      } catch { /* ignore */ }
    });
  };

  // Boot: fetch + loop
  useEffect(() => {
    updateTLE();
    const posTimer = setInterval(drawOrUpdate, CONFIG.POSITION_UPDATE_INTERVAL);
    const tleTimer = setInterval(updateTLE, CONFIG.TLE_UPDATE_INTERVAL);
    return () => {
      clearInterval(posTimer);
      clearInterval(tleTimer);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Back Button at bottom center */}
      <Link
        to="/"
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[1000]
                   px-4 py-2 rounded-lg bg-cyan-400 text-black font-semibold
                   shadow-lg hover:bg-cyan-300 transition"
      >
        ← Back to Home
      </Link>

      {/* Map */}
      <div id="map" ref={containerRef} style={{ height: "100vh", width: "100%" }} />

      {/* Status */}
      <div className="absolute top-4 right-4 bg-black/70 text-cyan-400 px-3 py-2 rounded-lg text-sm">
        {tleStatus} | {satCount} sats
      </div>
    </div>
  );
}
