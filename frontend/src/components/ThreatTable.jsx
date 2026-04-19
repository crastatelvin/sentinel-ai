import { motion } from 'framer-motion';

const SEV_COLORS = {
  critical: '#ff003c',
  high: '#ffb700',
  medium: '#00d4ff',
  low: '#00ff41'
};

export default function ThreatTable({ threats }) {
  return (
    <div className="card">
      <div style={{ fontSize: '0.65rem', color: '#4a6080', letterSpacing: '3px', marginBottom: '0.8rem' }}>
        ⚡ THREAT INTELLIGENCE TABLE
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,255,65,0.15)' }}>
              {['SEVERITY', 'THREAT TYPE', 'SOURCE IP', 'COUNTRY', 'CONFIDENCE', 'DESCRIPTION'].map(h => (
                <th key={h} style={{ padding: '0.5rem', textAlign: 'left', color: '#4a6080', letterSpacing: '1px', fontWeight: '500' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {threats.slice(0, 20).map((threat, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
              >
                <td style={{ padding: '0.5rem' }}>
                  <span style={{
                    color: SEV_COLORS[threat.severity],
                    fontWeight: '700',
                    fontSize: '0.65rem',
                    letterSpacing: '1px',
                    padding: '0.15rem 0.4rem',
                    border: `1px solid ${SEV_COLORS[threat.severity]}`,
                    borderRadius: '3px'
                  }}>
                    {threat.severity?.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '0.5rem', color: '#e2e8f0', fontWeight: '500' }}>{threat.threat_name}</td>
                <td style={{ padding: '0.5rem', color: '#00d4ff', fontFamily: 'JetBrains Mono' }}>{threat.ip}</td>
                <td style={{ padding: '0.5rem', color: '#4a6080' }}>{threat.geo?.country || 'Unknown'}</td>
                <td style={{ padding: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                      <div style={{ width: `${threat.confidence}%`, height: '100%', background: SEV_COLORS[threat.severity], borderRadius: '2px' }} />
                    </div>
                    <span style={{ color: '#4a6080', fontSize: '0.65rem' }}>{threat.confidence}%</span>
                  </div>
                </td>
                <td style={{ padding: '0.5rem', color: '#4a6080', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {threat.description}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
