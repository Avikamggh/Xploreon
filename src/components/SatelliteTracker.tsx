import React, { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap, TileLayer, Polyline, Marker } from "leaflet";

// ---------------------- Config ----------------------
const CONFIG = {
  TLE_UPDATE_INTERVAL: 6 * 60 * 60 * 1000, // 6h
  POSITION_UPDATE_INTERVAL: 1000,          // 1s
  AUTO_UPDATE_ENABLED: true,
  MAX_SATELLITES: 50,
  ORBIT_POINTS: 90,
};

// CORS proxies to fetch CelesTrak TLE without server changes
const CORS_PROXIES: { name: string; url: (u: string) => string; active: boolean }[] = [
  { name: "AllOrigins", url: (t) => `https://api.allorigins.win/raw?url=${encodeURIComponent(t)}`, active: true },
  { name: "corsproxy.io", url: (t) => `https://corsproxy.io/?${encodeURIComponent(t)}`, active: true },
  { name: "ThingProxy", url: (t) => `https://thingproxy.freeboard.io/fetch/${t}`, active: true },
];

// CelesTrak sources
const TLE_SOURCES: Record<string, string> = {
  stations: "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=tle",
  weather:  "https://celestrak.org/NORAD/elements/gp.php?GROUP=weather&FORMAT=tle",
  noaa:     "https://celestrak.org/NORAD/elements/gp.php?GROUP=noaa&FORMAT=tle",
  visual:   "https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle",
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
  40069: { name: "GOES-15 (Weather)", icon: "⛅" },
  29155: { name: "METOP-A (Weather)", icon: "🌡️" },
  38771: { name: "METOP-B (Weather)", icon: "🌨️" },
  43689: { name: "METOP-C (Weather)", icon: "❄️" },
};

// satellite.js is ESM in modern bundlers
// eslint-disable-next-line @typescript-eslint/no-var-requires
const satellite = require("satellite.js");

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

  // Map & layers
  const mapRef = useRef<LeafletMap | null>(null);
  const satLayerRef = useRef<TileLayer | null>(null);
  const streetLayerRef = useRef<TileLayer | null>(null);

  // Data + rendering refs (persist across renders)
  const tleDataRef = useRef<TLERow[]>([]);
  const markersRef = useRef<MarkerPair[]>([]);
  const orbitsRef = useRef<Polyline[]>([]);
  const selectedIndexRef = useRef<number | null>(null);
  const showOrbitsRef = useRef<boolean>(false);
  const workingProxyRef = useRef<string | null>(null);
  const lastTLEUpdateRef = useRef<Date | null>(null);
  const isMobileRef = useRef<boolean>(false);
  const mobileOpenRef = useRef<boolean>(false);

  // UI state
  const [tleStatus, setTleStatus] = useState<{ type: "loading"|"success"|"error"; msg: string }>({
    type: "loading",
    msg: "Initializing satellite data...",
  });
  const [activeCount, setActiveCount] = useState<number>(0);
  const [tleAgeHours, setTleAgeHours] = useState<string>("--");
  const [satCount, setSatCount] = useState<number>(0);
  const [mapType, setMapType] = useState<"satellite"|"street">("satellite");
  const [infoHtml, setInfoHtml] = useState<string>('<div style="text-align:center;color:#00ffe0;margin:20px 0;">Select a satellite to view details</div>');
  const [dropdownSel, setDropdownSel] = useState<string>("");

  // Title
  useEffect(() => { document.title = "Xploreon | Enhanced Satellite Tracker with Live TLE"; }, []);

  // init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Mobile flag
    isMobileRef.current = window.innerWidth <= 768;

    const map = L.map(containerRef.current, { worldCopyJump: true }).setView([0, 0], 2);
    mapRef.current = map;

    // Layers
    const sat = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "© Esri" }
    ).addTo(map);
    const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    });

    satLayerRef.current = sat;
    streetLayerRef.current = street;

    const onResize = () => {
      const wasMobile = isMobileRef.current;
      isMobileRef.current = window.innerWidth <= 768;
      if (wasMobile && !isMobileRef.current) {
        mobileOpenRef.current = false;
        const panel = document.getElementById("controlPanel");
        const toggle = document.getElementById("panelToggle");
        panel?.classList.remove("mobile-open");
        if (toggle) {
          toggle.textContent = "📡";
          (toggle as HTMLElement).style.background = "rgba(10, 10, 10, 0.9)";
          (toggle as HTMLElement).style.borderColor = "#00ffe0";
        }
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Helpers
  const setStatus = (type: "loading"|"success"|"error", msg: string) => setTleStatus({ type, msg });

  const isValidCoordinate = (lat: number, lng: number) =>
    !isNaN(lat) && !isNaN(lng) && isFinite(lat) && isFinite(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;

  const fetchWithProxy = async (url: string) => {
    const active = CORS_PROXIES.filter((p) => p.active);
    for (const p of active) {
      try {
        setStatus("loading", `📡 Trying ${p.name}...`);
        const proxyUrl = p.url(url);
        const resp = await fetch(proxyUrl, { headers: { Accept: "text/plain" }, signal: AbortSignal.timeout(15000) });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const text = await resp.text();
        if (text && text.includes("1 ") && text.includes("2 ") && text.length > 100) {
          workingProxyRef.current = p.name;
          return text;
        }
      } catch {
        /* try next */
      }
    }
    throw new Error("All CORS proxies failed");
  };

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
      if (
        featured ||
        /ISS|NOAA|GOES|TERRA|AQUA|LANDSAT|METOP|SENTINEL|TIANGONG|HUBBLE/i.test(name)
      ) {
        out.push({
          name: featured ? featured.name : name.replace(/\s+/g, " ").trim(),
          icon: featured ? featured.icon : "🛰️",
          noradId,
          tle1,
          tle2,
        });
      }
    }
    return out;
  };

  const storeCache = () => {
    try {
      localStorage.setItem(
        "satelliteTLEData",
        JSON.stringify({
          data: tleDataRef.current,
          timestamp: lastTLEUpdateRef.current?.getTime(),
          proxy: workingProxyRef.current,
        })
      );
    } catch {}
  };

  const loadCache = () => {
    try {
      const raw = localStorage.getItem("satelliteTLEData");
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      tleDataRef.current = parsed.data ?? [];
      lastTLEUpdateRef.current = new Date(parsed.timestamp ?? Date.now());
      setSatCount(tleDataRef.current.length);
      setStatus("success", `📱 Loaded ${tleDataRef.current.length} satellites from cache (${parsed.proxy || "Unknown"})`);
      return tleDataRef.current.length > 0;
    } catch {
      return false;
    }
  };

  const clearAllMarkers = () => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(({ icon, label }) => {
      map.removeLayer(icon);
      map.removeLayer(label);
    });
    orbitsRef.current.forEach((p) => map.removeLayer(p));
    markersRef.current = [];
    orbitsRef.current = [];
  };

  const getOrbitPoints = (satrec: any) => {
    const points: [number, number][] = [];
    const now = new Date();
    for (let i = 0; i < CONFIG.ORBIT_POINTS; i++) {
      const t = new Date(now.getTime() + i * 60 * 1000);
      const pos = satellite.propagate(satrec, t);
      if (pos.position && !pos.error) {
        const geo = satellite.eciToGeodetic(pos.position, satellite.gstime(t));
        const lat = satellite.degreesLat(geo.latitude);
        const lon = satellite.degreesLong(geo.longitude);
        if (isValidCoordinate(lat, lon)) points.push([lat, lon]);
      }
    }
    return points;
  };

  const calcSpeedKmh = (satrec: any, time: Date) => {
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
  };

  const updateInfoPanel = (row: TLERow | null) => {
    if (!row) {
      setInfoHtml('<div style="text-align:center;color:#00ffe0;margin:20px 0;">Select a satellite to view details</div>');
      return;
    }
    const now = new Date();
    const satrec = satellite.twoline2satrec(row.tle1, row.tle2);
    const p = satellite.propagate(satrec, now);
    if (!p.position || p.error) {
      setInfoHtml('<div style="text-align:center;color:#ff0000;">Error calculating position</div>');
      return;
    }
    const geo = satellite.eciToGeodetic(p.position, satellite.gstime(now));
    const lat = satellite.degreesLat(geo.latitude);
    const lon = satellite.degreesLong(geo.longitude);
    const alt = geo.height;
    if (!isValidCoordinate(lat, lon)) {
      setInfoHtml('<div style="text-align:center;color:#ff0000;">Invalid coordinates</div>');
      return;
    }
    const speed = calcSpeedKmh(satrec, now);
    const passType = alt > 35000 ? "Geostationary" : "Low Earth Orbit";
    const visible = alt > 200 && alt < 2000;

    setInfoHtml(`
      <div style="text-align:center;color:#00ffe0;margin-bottom:15px;font-weight:700;font-size:13px;">
        ${row.icon} ${row.name}
      </div>
      <div class="info-row"><span class="info-label">NORAD ID:</span><span class="info-value">${row.noradId}</span></div>
      <div class="info-row"><span class="info-label">Latitude:</span><span class="info-value">${lat.toFixed(4)}°</span></div>
      <div class="info-row"><span class="info-label">Longitude:</span><span class="info-value">${lon.toFixed(4)}°</span></div>
      <div class="info-row"><span class="info-label">Altitude:</span><span class="info-value">${alt.toFixed(2)} km</span></div>
      <div class="info-row"><span class="info-label">Speed:</span><span class="info-value">${speed} km/h</span></div>
      <div class="info-row"><span class="info-label">Orbit Type:</span><span class="info-value">${passType}</span></div>
      <div class="info-row"><span class="info-label">Visibility:</span><span class="info-value" style="color:${visible ? "#00ff00" : "#ffaa00"}">${visible ? "Potentially Visible" : "Not Visible"}</span></div>
      <div class="info-row"><span class="info-label">Last Update:</span><span class="info-value">${now.toLocaleTimeString()}</span></div>
    `);
  };

  const drawOrUpdate = () => {
    const map = mapRef.current;
    if (!map) return;
    const now = new Date();
    let active = 0;

    tleDataRef.current.forEach((row, i) => {
      try {
        const satrec = satellite.twoline2satrec(row.tle1, row.tle2);
        const p = satellite.propagate(satrec, now);
        if (!p.position || p.error) return;

        const geo = satellite.eciToGeodetic(p.position, satellite.gstime(now));
        const lat = satellite.degreesLat(geo.latitude);
        const lon = satellite.degreesLong(geo.longitude);
        if (!isValidCoordinate(lat, lon)) return;
        active++;

        if (markersRef.current[i]) {
          markersRef.current[i].icon.setLatLng([lat, lon]);
          markersRef.current[i].label.setLatLng([lat - 1.5, lon]);

          if (showOrbitsRef.current && orbitsRef.current[i]) {
            orbitsRef.current[i].setLatLngs(getOrbitPoints(satrec));
          }
        } else {
          const iconMarker = L.marker([lat, lon], {
            icon: L.divIcon({ className: "satellite-icon", html: "🛰️", iconSize: [32, 32], iconAnchor: [16, 16] }),
          });
          const labelMarker = L.marker([lat - 1.5, lon], {
            icon: L.divIcon({ className: "satellite-label", html: row.icon, iconSize: [30, 30], iconAnchor: [15, 15] }),
            interactive: false,
          });
          const orbit = L.polyline(getOrbitPoints(satrec), {
            color: "#00ffe0",
            weight: 2,
            opacity: 0.6,
            dashArray: "5, 5",
          });

          markersRef.current[i] = { icon: iconMarker, label: labelMarker };
          orbitsRef.current[i] = orbit;
        }

        if (selectedIndexRef.current === i) updateInfoPanel(row);
      } catch {
        /* ignore one-off errors */
      }
    });

    setActiveCount(active);
  };

  // Fetch TLE (with cache + fallbacks)
  const updateTLE = async () => {
    setStatus("loading", "🔄 Fetching fresh TLE data...");
    try {
      const all: TLERow[] = [];
      for (const key of ["stations", "weather", "noaa", "visual"] as const) {
        try {
          const text = await fetchWithProxy(TLE_SOURCES[key]);
          all.push(...parseTLE(text));
        } catch {
          /* next source */
        }
      }
      if (!all.length) throw new Error("No valid satellites found");

      // unique by NORAD
      const unique = all.filter((sat, idx, arr) => arr.findIndex((s) => s.noradId === sat.noradId) === idx);
      unique.sort((a, b) => {
        const af = FEATURED_SATELLITES[a.noradId] ? 1 : 0;
        const bf = FEATURED_SATELLITES[b.noradId] ? 1 : 0;
        return bf - af || a.name.localeCompare(b.name);
      });

      tleDataRef.current = unique.slice(0, CONFIG.MAX_SATELLITES);
      lastTLEUpdateRef.current = new Date();
      setSatCount(tleDataRef.current.length);
      const proxyName = workingProxyRef.current || "Unknown";
      setStatus("success", `✅ Loaded ${tleDataRef.current.length} satellites (${proxyName})`);
      storeCache();
    } catch (e: any) {
      setStatus("error", `❌ Update failed: ${e?.message || "Unknown error"}`);
      if (!loadCache()) {
        tleDataRef.current = [];
        setSatCount(0);
      }
    }
  };

  // boot: map + data + intervals
  useEffect(() => {
    let posTimer: number | undefined;
    let tleTimer: number | undefined;
    let ageTimer: number | undefined;

    // initial: try cache, then fetch fresh
    const hadCache = loadCache();
    updateTLE().then(() => {
      // If we had cache and it’s very old (>12h), we already fetched above anyway.
    });

    // position updates
    posTimer = window.setInterval(drawOrUpdate, CONFIG.POSITION_UPDATE_INTERVAL);

    // tle auto-refresh
    if (CONFIG.AUTO_UPDATE_ENABLED) {
      tleTimer = window.setInterval(updateTLE, CONFIG.TLE_UPDATE_INTERVAL);
    }

    // status tick
    ageTimer = window.setInterval(() => {
      if (lastTLEUpdateRef.current) {
        const ageH = Math.floor((Date.now() - lastTLEUpdateRef.current.getTime()) / 36e5);
        setTleAgeHours(`${ageH}h`);
      }
    }, 60 * 1000);

    // page visibility
    const onVis = () => {
      const el = document.getElementById("updateStatus");
      if (el) el.textContent = document.hidden ? "Paused" : "Active";
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      if (posTimer) clearInterval(posTimer);
      if (tleTimer) clearInterval(tleTimer);
      if (ageTimer) clearInterval(ageTimer);
      document.removeEventListener("visibilitychange", onVis);
      clearAllMarkers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Map type switcher
  useEffect(() => {
    const map = mapRef.current, sat = satLayerRef.current, street = streetLayerRef.current;
    if (!map || !sat || !street) return;
    if (mapType === "satellite") {
      if (map.hasLayer(street)) map.removeLayer(street);
      if (!map.hasLayer(sat)) sat.addTo(map);
    } else {
      if (map.hasLayer(sat)) map.removeLayer(sat);
      if (!map.hasLayer(street)) street.addTo(map);
    }
  }, [mapType]);

  // Dropdown
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const map = mapRef.current;
    if (!map) return;
    const idx = e.target.value === "" ? NaN : parseInt(e.target.value, 10);
    setDropdownSel(e.target.value);
    selectedIndexRef.current = isNaN(idx) ? null : idx;

    markersRef.current.forEach((m, i) => {
      if (isNaN(idx)) {
        map.removeLayer(m.icon);
        map.removeLayer(m.label);
        orbitsRef.current[i] && map.removeLayer(orbitsRef.current[i]);
      } else if (i === idx) {
        m.icon.addTo(map);
        m.label.addTo(map);
        if (showOrbitsRef.current && orbitsRef.current[i]) orbitsRef.current[i].addTo(map);
        map.setView(m.icon.getLatLng(), 4);
        updateInfoPanel(tleDataRef.current[i]);
      } else {
        map.removeLayer(m.icon);
        map.removeLayer(m.label);
        orbitsRef.current[i] && map.removeLayer(orbitsRef.current[i]);
      }
    });

    if (isNaN(idx)) {
      updateInfoPanel(null);
    }
  };

  // Buttons
  const showAll = () => {
    const map = mapRef.current;
    if (!map) return;
    selectedIndexRef.current = null;
    setDropdownSel("");
    markersRef.current.forEach((m, i) => {
      m.icon.addTo(map);
      m.label.addTo(map);
      if (showOrbitsRef.current && orbitsRef.current[i]) orbitsRef.current[i].addTo(map);
    });
    map.setView([0, 0], 2);
    setInfoHtml(`<div style="text-align:center;color:#00ffe0;margin:20px 0;">Showing ${tleDataRef.current.length} satellites</div>`);
    if (isMobileRef.current && mobileOpenRef.current) togglePanel();
  };

  const clearAll = () => {
    const map = mapRef.current;
    if (!map) return;
    selectedIndexRef.current = null;
    setDropdownSel("");
    markersRef.current.forEach((m, i) => {
      map.removeLayer(m.icon);
      map.removeLayer(m.label);
      orbitsRef.current[i] && map.removeLayer(orbitsRef.current[i]);
    });
    setInfoHtml('<div style="text-align:center;color:#00ffe0;margin:20px 0;">Select a satellite to view details</div>');
    if (isMobileRef.current && mobileOpenRef.current) togglePanel();
  };

  const toggleOrbits = () => {
    const map = mapRef.current;
    if (!map) return;
    showOrbitsRef.current = !showOrbitsRef.current;

    const btn = document.getElementById("orbitBtn");
    if (btn) btn.textContent = showOrbitsRef.current ? "Hide Orbits" : "Orbits";

    if (selectedIndexRef.current !== null) {
      const i = selectedIndexRef.current;
      if (showOrbitsRef.current) {
        orbitsRef.current[i] && orbitsRef.current[i].addTo(map);
      } else {
        orbitsRef.current[i] && map.removeLayer(orbitsRef.current[i]);
      }
    } else {
      markersRef.current.forEach((m, i) => {
        if (map.hasLayer(m.icon) && orbitsRef.current[i]) {
          showOrbitsRef.current ? orbitsRef.current[i].addTo(map) : map.removeLayer(orbitsRef.current[i]);
        }
      });
    }
  };

  const refreshTLE = () => updateTLE();

  const togglePanel = () => {
    const panel = document.getElementById("controlPanel");
    const toggle = document.getElementById("panelToggle");
    mobileOpenRef.current = !mobileOpenRef.current;
    if (mobileOpenRef.current) {
      panel?.classList.add("mobile-open");
      if (toggle) {
        toggle.textContent = "✕";
        (toggle as HTMLElement).style.background = "#ff4444";
        (toggle as HTMLElement).style.borderColor = "#ff4444";
      }
    } else {
      panel?.classList.remove("mobile-open");
      if (toggle) {
        toggle.textContent = "📡";
        (toggle as HTMLElement).style.background = "rgba(10,10,10,0.9)";
        (toggle as HTMLElement).style.borderColor = "#00ffe0";
      }
    }
  };

  // Derived dropdown options
  const options = useMemo(
    () =>
      tleDataRef.current.map((sat, i) => (
        <option key={sat.noradId} value={i}>
          {sat.icon} {sat.name}
        </option>
      )),
    [satCount, tleStatus] // rerender when data count/status changes
  );

  return (
    <div style={{ position: "relative" }}>
      {/* Map toggle */}
      <div className="map-toggle" style={{ position: "fixed", top: 20, left: 20, zIndex: 999, display: "flex", gap: 10 }}>
        <button
          className={`map-btn ${mapType === "satellite" ? "active" : ""}`}
          onClick={() => setMapType("satellite")}
        >
          🛰️ Satellite
        </button>
        <button
          className={`map-btn ${mapType === "street" ? "active" : ""}`}
          onClick={() => setMapType("street")}
        >
          🗺️ Street
        </button>
      </div>

      {/* Map container */}
      <div id="map" ref={containerRef} style={{ height: "100vh", width: "100%" }} />

      {/* Mobile toggle */}
      <div className="panel-toggle" id="panelToggle" onClick={togglePanel}>
        📡
      </div>

      {/* Control Panel */}
      <div className="control-panel" id="controlPanel">
        <div className="panel-title">🛰️ LIVE SATELLITE TRACKER</div>

        <div className="cors-info">🌐 CORS-Enabled | Live TLE Data from CelesTrak</div>

        <div className={`tle-status ${tleStatus.type}`}>{tleStatus.msg}</div>

        <div className="satellite-selector" style={{ marginBottom: 15 }}>
          <select id="satDropdown" value={dropdownSel} onChange={onSelectChange}>
            <option value="">-- Select Satellite --</option>
            {options}
          </select>
        </div>

        <div className="control-buttons">
          <button className="control-btn" onClick={showAll}>Show All</button>
          <button className="control-btn" onClick={clearAll}>Clear All</button>
          <button id="orbitBtn" className="control-btn" onClick={toggleOrbits}>Orbits</button>
          <button id="updateBtn" className="control-btn" onClick={refreshTLE}>Refresh TLE</button>
        </div>

        <div className="status-indicator">
          🔄 Position Updates: <span id="updateStatus">Active</span><br />
          📡 TLE Age: <span id="tleAge">{tleAgeHours}</span><br />
          🛰️ Satellites: <span id="satCount">{satCount}</span>
        </div>

        <div
          className="satellite-info"
          id="satelliteInfo"
          dangerouslySetInnerHTML={{ __html: infoHtml }}
        />
      </div>

      {/* Styles ported from your HTML (scoped via classNames) */}
      <style>{`
        * { box-sizing: border-box; }
        .leaflet-control-attribution { display: none; }
        .panel-toggle {
          position: fixed; top: 20px; right: 20px; z-index: 1000;
          background: rgba(10,10,10,0.9); color: #00ffe0; border: 2px solid #00ffe0;
          border-radius: 50%; width: 50px; height: 50px; display: none; align-items: center; justify-content: center;
          cursor: pointer; font-size: 20px; transition: all .3s ease; backdrop-filter: blur(10px);
        }
        .panel-toggle:hover { background: #00ffe0; color: #000; transform: scale(1.1); }

        .control-panel {
          position: fixed; top: 20px; right: 20px; z-index: 999; background: rgba(10,10,10,.95);
          padding: 20px; border-radius: 15px; border: 2px solid #00ffe0; color: #fff; min-width: 320px; max-width: 350px;
          backdrop-filter: blur(10px); box-shadow: 0 0 30px rgba(0,255,224,.3); max-height: 90vh; overflow-y: auto;
        }
        .panel-title { color: #00ffe0; font-weight: 700; font-size: 16px; margin-bottom: 15px; text-align: center; text-shadow: 0 0 10px #00ffe0; }
        .satellite-selector select {
          width: 100%; padding: 10px; border-radius: 8px; background: rgba(0,0,0,.8); color: #00ffe0; border: 1px solid #00ffe0; font-size: 12px;
        }
        .control-buttons { display:flex; gap:8px; margin-bottom:15px; flex-wrap:wrap; }
        .control-btn { flex:1; min-width: 90px; background: linear-gradient(45deg,#00ffe0,#00d4aa); color:#000; border:none; padding:8px 10px; border-radius:6px; font-weight:600; font-size:10px; cursor:pointer; transition: all .3s ease; }
        .control-btn:hover { transform: scale(1.05); box-shadow: 0 0 15px rgba(0,255,224,.6); }
        .satellite-info { background: rgba(0,0,0,.8); padding: 15px; border-radius: 10px; border: 1px solid #00ffe0; font-size: 11px; line-height: 1.4; }
        .info-row { display:flex; justify-content: space-between; margin-bottom:8px; padding:4px 0; border-bottom: 1px solid rgba(0,255,224,.2); }
        .info-label { color:#00ffe0; font-weight:600; }
        .info-value { color:#fff; font-weight:400; }
        .satellite-icon { font-size: 28px; text-align:center; line-height:32px; filter: drop-shadow(0 0 8px #00ffe0); animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{ transform: scale(1); } 50%{ transform: scale(1.1); } }
        .satellite-label { color:#fff; font-size:18px; font-weight:600; text-shadow:2px 2px 4px rgba(0,0,0,.8), 0 0 10px #00ffe0;
          text-align:center; background: rgba(0,0,0,.7); padding:4px 8px; border-radius:50%; border:1px solid rgba(0,255,224,.5); backdrop-filter: blur(5px); white-space:nowrap; }
        .map-toggle .map-btn { background: rgba(10,10,10,.9); color: #00ffe0; border: 2px solid #00ffe0; padding: 10px 15px; border-radius: 8px; font-weight:600; cursor:pointer; transition: all .3s ease; font-size:12px; }
        .map-toggle .map-btn:hover, .map-toggle .map-btn.active { background: #00ffe0; color:#000; box-shadow: 0 0 15px rgba(0,255,224,.6); }
        .status-indicator { text-align:center; color:#00ffe0; font-size:10px; margin:10px 0; opacity:.8; padding:8px; background: rgba(0,0,0,.5); border-radius:8px; border:1px solid rgba(0,255,224,.3); }
        .tle-status { background: rgba(0,0,0,.7); padding:12px; border-radius:8px; border:1px solid #00ffe0; margin-bottom:15px; font-size:11px; text-align:center; }
        .tle-status.loading { border-color:#ffaa00; color:#ffaa00; animation: loading-pulse 1.5s infinite; }
        .tle-status.success { border-color:#00ff00; color:#00ff00; }
        .tle-status.error { border-color:#ff0000; color:#ff0000; }
        @keyframes loading-pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        .cors-info { background: rgba(0,100,200,.1); border:1px solid #0080ff; color:#80c0ff; padding:10px; border-radius:6px; font-size:9px; margin-bottom:15px; text-align:center; }

        /* Mobile */
        @media (max-width: 768px) {
          .control-panel { top:70px; right:10px; left:10px; min-width:auto; max-width:none; padding:15px; max-height:60vh; transform: translateY(-100%); opacity: 0; pointer-events: none; }
          .control-panel.mobile-open { transform: translateY(0); opacity: 1; pointer-events: all; }
          .panel-toggle { display:flex; top:15px; right:15px; }
          .map-toggle { top:15px; left:15px; gap:5px; }
          .map-btn { padding:8px 12px; font-size:11px; }
          .control-buttons { gap:5px; }
          .control-btn { min-width:70px; padding:6px 8px; font-size:9px; }
        }
        .control-panel::-webkit-scrollbar { width:6px; }
        .control-panel::-webkit-scrollbar-thumb { background: rgba(0,255,224,.5); border-radius:3px; }
        .control-panel::-webkit-scrollbar-thumb:hover { background: rgba(0,255,224,.8); }
      `}</style>
    </div>
  );
}
