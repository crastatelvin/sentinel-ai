import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SEVERITY_COLORS = {
  critical: '#ff003c',
  high: '#ffb700',
  medium: '#00d4ff',
  low: '#00ff41'
};

export default function TerminalFeed({ threats }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threats]);

  return (
    <div className="card" style={{ height: '300px' }}>
      <div style={{ fontSize: '0.65rem', color: '#4a6080', letterSpacing: '3px', marginBottom: '0.8rem' }}>
        ▶ LIVE THREAT FEED
      </div>
      <div style={{
        height: '240px',
        overflowY: 'auto',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.7rem'
      }}>
        {threats.length === 0 ? (
          <div style={{ color: '#00ff41' }}>
            <span style={{ opacity: 0.5 }}>{'>'}</span> awaiting log input...
            <span style={{ animation: 'pulse-green 1s infinite' }}>█</span>
          </div>
        ) : (
          threats.slice(-80).map((threat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                marginBottom: '0.3rem',
                color: SEVERITY_COLORS[threat.severity] || '#00ff41',
                borderLeft: `2px solid ${SEVERITY_COLORS[threat.severity]}`,
                paddingLeft: '0.5rem'
              }}
            >
              <span style={{ color: '#4a6080' }}>[{threat.time || 'unknown'}]</span>
              {' '}<span style={{ color: '#00d4ff' }}>{threat.ip}</span>
              {' '}<span style={{ fontWeight: '600' }}>{threat.threat_name}</span>
              {' '}<span style={{ opacity: 0.6, fontSize: '0.65rem' }}>{threat.description?.slice(0, 50)}...</span>
            </motion.div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
