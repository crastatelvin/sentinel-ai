import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TimelineChart({ threats }) {
  // Group threats by time bucket (every 10 entries as a "bucket")
  const buckets = [];
  const size = 10;
  for (let i = 0; i < threats.length; i += size) {
    const chunk = threats.slice(i, i + size);
    const criticals = chunk.filter(t => t.severity === 'critical').length;
    buckets.push({
      t: `+${i}`,
      total: chunk.length,
      critical: criticals
    });
  }

  return (
    <div className="card">
      <div style={{ fontSize: '0.65rem', color: '#4a6080', letterSpacing: '3px', marginBottom: '0.5rem' }}>
        ⟳ ATTACK TIMELINE
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={buckets}>
          <defs>
            <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="critGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff003c" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ff003c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,255,65,0.08)" />
          <XAxis dataKey="t" tick={{ fill: '#4a6080', fontSize: 10 }} />
          <YAxis tick={{ fill: '#4a6080', fontSize: 10 }} />
          <Tooltip
            contentStyle={{ background: '#0d1117', border: '1px solid rgba(0,255,65,0.2)', borderRadius: '6px', fontFamily: 'JetBrains Mono', fontSize: '0.7rem' }}
            labelStyle={{ color: '#00ff41' }}
          />
          <Area type="monotone" dataKey="total" stroke="#00d4ff" fill="url(#totalGrad)" strokeWidth={1.5} name="Total" />
          <Area type="monotone" dataKey="critical" stroke="#ff003c" fill="url(#critGrad)" strokeWidth={1.5} name="Critical" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
