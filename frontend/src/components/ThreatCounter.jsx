import { motion, AnimatePresence } from 'framer-motion';

export default function ThreatCounter({ summary }) {
  const total = summary?.total || 0;
  const critical = summary?.by_severity?.critical || 0;

  return (
    <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
      <div style={{ fontSize: '0.65rem', color: '#4a6080', letterSpacing: '3px', marginBottom: '0.5rem' }}>
        THREATS DETECTED
      </div>
      <motion.div
        key={total}
        initial={{ scale: 1.3, color: '#ff003c' }}
        animate={{ scale: 1, color: total > 0 ? '#ff003c' : '#00ff41' }}
        transition={{ duration: 0.4 }}
        style={{
          fontSize: '4rem',
          fontWeight: '900',
          fontFamily: 'Orbitron, monospace',
          lineHeight: 1,
          textShadow: total > 0 ? '0 0 30px rgba(255,0,60,0.7)' : '0 0 30px rgba(0,255,65,0.5)'
        }}
      >
        {total}
      </motion.div>

      {/* Severity breakdown */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
        {[
          { label: 'CRITICAL', key: 'critical', color: '#ff003c' },
          { label: 'HIGH', key: 'high', color: '#ffb700' },
          { label: 'MEDIUM', key: 'medium', color: '#00d4ff' },
          { label: 'LOW', key: 'low', color: '#00ff41' }
        ].map(({ label, key, color }) => (
          <div key={key} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color, fontFamily: 'Orbitron, monospace' }}>
              {summary?.by_severity?.[key] || 0}
            </div>
            <div style={{ fontSize: '0.55rem', color: '#4a6080', letterSpacing: '1px' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
