import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RemediationPanel({ remediation }) {
  const [copied, setCopied] = useState(null);

  const copyCommand = (cmd, i) => {
    navigator.clipboard.writeText(cmd);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!remediation || remediation.length === 0) {
    return (
      <div className="card">
        <div style={{ fontSize: '0.65rem', color: '#4a6080', letterSpacing: '3px' }}>🛡️ REMEDIATION PLAYBOOK</div>
        <div style={{ color: '#4a6080', fontSize: '0.8rem', marginTop: '0.5rem' }}>Awaiting threat analysis...</div>
      </div>
    );
  }

  return (
    <div className="card" style={{ overflowY: 'auto', maxHeight: '400px' }}>
      <div style={{ fontSize: '0.65rem', color: '#00ff41', letterSpacing: '3px', marginBottom: '1rem' }}>
        🛡️ REMEDIATION PLAYBOOK
      </div>
      {remediation.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          style={{ marginBottom: '1rem', padding: '0.8rem', background: 'rgba(0,255,65,0.04)', borderRadius: '6px', border: '1px solid rgba(0,255,65,0.1)' }}
        >
          <div style={{ fontSize: '0.7rem', color: '#e2e8f0', marginBottom: '0.4rem', fontWeight: '500' }}>
            <span style={{ color: '#00ff41', marginRight: '0.4rem' }}>#{i + 1}</span>
            {item.action}
          </div>
          <div style={{
            background: '#060a12',
            padding: '0.5rem 0.8rem',
            borderRadius: '4px',
            fontFamily: 'JetBrains Mono',
            fontSize: '0.72rem',
            color: '#00d4ff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ flex: 1, overflowX: 'auto' }}>$ {item.command}</span>
            <button
              onClick={() => copyCommand(item.command, i)}
              style={{
                background: copied === i ? '#00ff41' : 'transparent',
                border: `1px solid ${copied === i ? '#00ff41' : 'rgba(0,212,255,0.3)'}`,
                color: copied === i ? '#000' : '#00d4ff',
                padding: '0.2rem 0.5rem',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '0.6rem',
                fontFamily: 'JetBrains Mono',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {copied === i ? 'COPIED!' : 'COPY'}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
