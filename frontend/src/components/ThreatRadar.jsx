import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

const CATEGORY_LABELS = {
  brute_force: 'Brute Force',
  sqli: 'SQL Inject',
  xss: 'XSS',
  traversal: 'Path Trav.',
  recon: 'Recon',
  cmdi: 'Cmd Inject',
  ddos: 'DDoS'
};

export default function ThreatRadar({ summary }) {
  const byCategory = summary?.by_category || {};

  const data = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
    category: label,
    value: byCategory[key] || 0
  }));

  return (
    <div className="card">
      <div style={{ fontSize: '0.65rem', color: '#4a6080', letterSpacing: '3px', marginBottom: '0.5rem' }}>
        ◎ THREAT RADAR
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(0,255,65,0.15)" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: '#4a6080', fontSize: 10, fontFamily: 'JetBrains Mono' }}
          />
          <Radar
            dataKey="value"
            stroke="#00ff41"
            fill="#00ff41"
            fillOpacity={0.15}
            strokeWidth={1.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
