import { useRef, useEffect, useState } from 'react';

export default function GlobeMap({ mapData }) {
  const [Globe, setGlobe] = useState(null);

  // Lazy load react-globe.gl (it's heavy)
  useEffect(() => {
    import('react-globe.gl').then(mod => setGlobe(() => mod.default));
  }, []);

  const points = (mapData || []).map(d => ({
    lat: d.lat,
    lng: d.lng,
    size: Math.min(d.count * 0.5 + 0.3, 2),
    color: d.severity === 'critical' ? '#ff003c' : d.severity === 'high' ? '#ffb700' : '#00d4ff',
    label: `${d.ip} (${d.country}) — ${d.count} attacks`
  }));

  return (
    <div className="card" style={{ padding: '0.5rem', overflow: 'hidden' }}>
      <div style={{ fontSize: '0.65rem', color: '#4a6080', letterSpacing: '3px', padding: '0.5rem 0.8rem 0.3rem' }}>
        🌍 GLOBAL ATTACK ORIGIN MAP
      </div>
      <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!Globe ? (
          <div style={{ color: '#00ff41', fontSize: '0.8rem', animation: 'pulse-green 1s infinite' }}>
            Initializing globe...
          </div>
        ) : (
          <Globe
            width={420}
            height={280}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            pointsData={points}
            pointLat="lat"
            pointLng="lng"
            pointColor="color"
            pointAltitude="size"
            pointRadius={0.4}
            pointLabel="label"
            atmosphereColor="#00d4ff"
            atmosphereAltitude={0.15}
          />
        )}
      </div>
    </div>
  );
}
