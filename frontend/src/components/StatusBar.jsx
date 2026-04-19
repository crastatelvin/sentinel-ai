import { motion } from 'framer-motion';
import useWebSocket from '../hooks/useWebSocket';

export default function StatusBar({ threatCount }) {
  const { messages, status } = useWebSocket();
  const latest = messages[messages.length - 1];

  return (
    <div style={{
      background: '#060a12',
      borderBottom: '1px solid rgba(0,255,65,0.2)',
      padding: '0.5rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.72rem',
      fontFamily: 'JetBrains Mono, monospace'
    }}>
      {/* Left */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <span style={{ color: '#00ff41', fontWeight: '700', fontSize: '0.9rem', fontFamily: 'Orbitron, monospace' }}>
          ⬡ SENTINEL<span style={{ color: '#00d4ff' }}>AI</span>
        </span>
        <span style={{ color: '#4a6080' }}>THREAT INTELLIGENCE PLATFORM v1.0</span>
      </div>

      {/* Center — live message */}
      <motion.div
        key={latest?.message}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ color: '#00d4ff', fontSize: '0.7rem' }}
      >
        {latest ? `> ${latest.message}` : '> SYSTEM READY'}
      </motion.div>

      {/* Right */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <span style={{ color: '#4a6080' }}>
          THREATS: <span style={{ color: threatCount > 0 ? '#ff003c' : '#00ff41' }}>{threatCount}</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4a6080' }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: status === 'connected' ? '#00ff41' : '#ff003c',
            display: 'inline-block',
            boxShadow: status === 'connected' ? '0 0 8px #00ff41' : '0 0 8px #ff003c'
          }} />
          {status.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
