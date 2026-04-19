import { motion } from 'framer-motion';

const SEV_COLORS = { critical: '#ff003c', high: '#ffb700', medium: '#00d4ff', low: '#00ff41' };

export default function AttackChain({ chains }) {
  if (!chains || chains.length === 0) return null;

  return (
    <div className="card">
      <div style={{ fontSize: '0.65rem', color: '#ffb700', letterSpacing: '3px', marginBottom: '1rem' }}>
        ⛓ ATTACK CHAIN ANALYSIS
      </div>
      {chains.slice(0, 5).map((chain, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          style={{
            marginBottom: '1rem',
            padding: '0.8rem',
            border: `1px solid ${SEV_COLORS[chain.max_severity]}33`,
            borderLeft: `3px solid ${SEV_COLORS[chain.max_severity]}`,
            borderRadius: '4px',
            background: `${SEV_COLORS[chain.max_severity]}08`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ color: '#00d4ff', fontWeight: '600', fontSize: '0.75rem' }}>{chain.ip}</span>
            <span style={{ display: 'flex', gap: '0.4rem' }}>
              {chain.techniques.map(t => (
                <span key={t} style={{ fontSize: '0.55rem', padding: '0.1rem 0.3rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', color: '#4a6080' }}>
                  {t}
                </span>
              ))}
            </span>
          </div>
          <div style={{ color: '#a0b4c8', fontSize: '0.75rem', lineHeight: '1.6' }}>
            {chain.narrative}
          </div>
          <div style={{ marginTop: '0.4rem', fontSize: '0.65rem', color: '#4a6080' }}>
            {chain.attack_count} attacks • {chain.geo?.country || 'Unknown'} •
            <span style={{ color: SEV_COLORS[chain.max_severity], marginLeft: '0.3rem' }}>
              {chain.max_severity?.toUpperCase()}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
