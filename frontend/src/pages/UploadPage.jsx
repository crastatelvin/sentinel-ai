import { useState } from 'react';
import { motion } from 'framer-motion';
import { uploadLog } from '../services/api';

export default function UploadPage({ onUploadSuccess }) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setError('');
    setProgress('Uploading log file...');
    try {
      setProgress('Parsing log entries...');
      const data = await uploadLog(file);
      setProgress('Analysis complete!');
      setTimeout(() => onUploadSuccess(data), 500);
    } catch (err) {
      setError('Upload failed. Check backend is running.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0e1a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'JetBrains Mono, monospace',
      padding: '2rem'
    }}>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <div style={{ fontSize: '3rem', fontFamily: 'Orbitron, monospace', fontWeight: '900', letterSpacing: '4px' }}>
          <span style={{ color: '#00ff41' }}>SENTINEL</span>
          <span style={{ color: '#00d4ff' }}>AI</span>
        </div>
        <div style={{ color: '#4a6080', fontSize: '0.7rem', letterSpacing: '4px', marginTop: '0.3rem' }}>
          THREAT INTELLIGENCE PLATFORM
        </div>
        {/* Animated underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #00ff41, transparent)', marginTop: '0.8rem' }}
        />
      </motion.div>

      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
        style={{
          width: '100%',
          maxWidth: '520px',
          border: `1px dashed ${dragging ? '#00ff41' : 'rgba(0,255,65,0.25)'}`,
          borderRadius: '8px',
          padding: '3rem 2rem',
          textAlign: 'center',
          background: dragging ? 'rgba(0,255,65,0.04)' : '#0d1117',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: dragging ? '0 0 30px rgba(0,255,65,0.15)' : 'none'
        }}
      >
        {loading ? (
          <div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ fontSize: '2rem', marginBottom: '1rem', display: 'inline-block' }}
            >
              ◌
            </motion.div>
            <div style={{ color: '#00ff41', fontSize: '0.8rem' }}>{progress}</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⬡</div>
            <div style={{ color: '#e2e8f0', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Drop server log file here
            </div>
            <div style={{ color: '#4a6080', fontSize: '0.7rem', marginBottom: '1.5rem' }}>
              Supports: Apache • Nginx • Auth logs • CSV
            </div>
            <label style={{
              background: 'transparent',
              border: '1px solid rgba(0,255,65,0.5)',
              color: '#00ff41',
              padding: '0.5rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              letterSpacing: '2px',
              transition: 'all 0.2s'
            }}>
              SELECT FILE
              <input type="file" accept=".log,.txt,.csv" style={{ display: 'none' }} onChange={(e) => handleFile(e.target.files[0])} />
            </label>
          </>
        )}
        {error && <div style={{ color: '#ff003c', marginTop: '1rem', fontSize: '0.75rem' }}>{error}</div>}
      </motion.div>

      {/* Sample files hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ marginTop: '2rem', color: '#4a6080', fontSize: '0.65rem', textAlign: 'center', letterSpacing: '1px' }}
      >
        Use sample_logs/sample_auth.log to test
      </motion.div>
    </div>
  );
}
