import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap, TileLayer, Polyline, Marker } from "leaflet";
import * as satellite from "satellite.js";
import { Link } from "react-router-dom";

// ---------------------- Config ----------------------
const CONFIG = {
  TLE_UPDATE_INTERVAL: 6 * 60 * 60 * 1000, // 6h
  POSITION_UPDATE_INTERVAL: 1000,          // 1s
  AUTO_UPDATE_ENABLED: true,
  MAX_SATELLITES: 50,
  ORBIT_POINTS: 90,
};

// Your Netlify proxy endpoints
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
  43013: { name: "NOAA 20 (JPSS-1)", icon: "⛈️" },
  41866: { name: "GOES-16 (Weather)", icon: "🌪️" },
  25994: { name: "TERRA (Earth Observation)", icon: "🌍" },
  27424: { name: "AQUA (Earth Observation)", icon: "🌊" },
  39084: { name: "LANDSAT 8", icon: "📸" },
  49260: { name: "LANDSAT 9", icon: "📷" },
  43692: { name: "SENTINEL-3B", icon: "🛰️" },
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
  const satLayerRef = useRef<TileLayer | null>(null);
  const streetLayerRef = useRef<TileLayer | null>(null);

  const tleDataRef = useRef<TLERow[]>([]);
  const markersRef = useRef<MarkerPair[]>([]);
  const orbitsRef = useRef<Polyline[]>([]);
  const selectedIndexRef = useRef<number | null>(null);

  const [tleStatus, setTleStatus] = useState<{ type: "loading"|"success"|"error"; msg: string }>({
    type: "loading",
    msg: "Initializing satellite data...",
  });
  const [tleAgeHours, setTleAgeHours] = useState<string>("--");
  const [satCount, setSatCount] = useState<number>(0);
  const [mapType, setMapType] = useState<"satellite"|"street">("satellite");
  const [infoHtml, setInfoHtml] = useState<string>(
    '<div style="text-align:center;color:#00ffe0;margin:20px 0;">Select a satellite to view details</div>'
  );
  const [dropdownSel, setDropdownSel] = useState<string>("");

  useEffect(() => {
    document.title = "Xploreon | Enhanced Satellite Tracker";
  }, []);

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { worldCopyJump: true }).setView([0, 0], 2);
    mapRef.current = map;

    const sat = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "© Esri" }
    ).addTo(map);
    const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    });

    satLayerRef.current = sat;
    streetLayerRef.current = street;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Parse TLE
  const parseTLE = (tleText: string): TLERow[] => {
    const lines = tleText.split("\n").map((l) => l.trim()).filter(Boolean);
    const out: TLERow[] = [];
    for (let i = 0; i < lines.length && out.length < CONFIG.MAX_SATELLITES; i += 3) {
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
    setTleStatus({ type: "loading", msg: "🔄 Fetching fresh TLE..." });
    try {
      const all: TLERow[] = [];
      for (const key of Object.keys(TLE_SOURCES) as (keyof typeof TLE_SOURCES)[]) {
        const resp = await fetch(TLE_SOURCES[key]);
        const text = await resp.text();
        all.push(...parseTLE(text));
      }
      tleDataRef.current = all;
      setSatCount(all.length);
      setTleStatus({ type: "success", msg: `✅ Loaded ${all.length} satellites` });
    } catch (err: any) {
      setTleStatus({ type: "error", msg: `❌ Failed: ${err.message}` });
    }
  };

  useEffect(() => {
    updateTLE();
    const timer = setInterval(updateTLE, CONFIG.TLE_UPDATE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const options = useMemo(
    () =>
      tleDataRef.current.map((sat, i) => (
        <option key={sat.noradId} value={i}>
          {sat.icon} {sat.name}
        </option>
      )),
    [satCount, tleStatus]
  );

  return (
    <div style={{ position: "relative" }}>
      {/* Back Button */}
      <Link
        to="/"
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[1000]
                   px-4 py-2 rounded-lg bg-cyan-400 text-black font-semibold
                   shadow-lg hover:bg-cyan-300 transition"
      >
        ← Back to Home
      </Link>

      {/* Map */}
      <div id="map" ref={containerRef} style={{ height: "100vh", width: "100%" }} />

      {/* Control Panel */}
      <div className="control-panel" id="controlPanel">
        <div className="panel-title">🛰️ LIVE SATELLITE TRACKER</div>
        <div className={`tle-status ${tleStatus.type}`}>{tleStatus.msg}</div>
        <div className="satellite-selector">
          <select id="satDropdown" value={dropdownSel} onChange={(e) => setDropdownSel(e.target.value)}>
            <option value="">-- Select Satellite --</option>
            {options}
          </select>
        </div>
        <div className="status-indicator">
          📡 Satellites Loaded: <span>{satCount}</span>
        </div>
        <div
          className="satellite-info"
          id="satelliteInfo"
          dangerouslySetInnerHTML={{ __html: infoHtml }}
        />
      </div>
    </div>
  );
}
