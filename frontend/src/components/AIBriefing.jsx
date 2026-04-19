import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function AIBriefing({ analysis, prediction }) {
  if (!analysis?.executive_briefing) {
    return (
      <div className="card">
        <div style={{ fontSize: '0.65rem', color: '#4a6080', letterSpacing: '3px', marginBottom: '0.5rem' }}>
          🧠 AI THREAT BRIEFING
        </div>
        <div style={{ color: '#4a6080', fontSize: '0.8rem' }}>Upload a log file to generate AI analysis...</div>
      </div>
    );
  }

  return (
    <div className="card glow-cyan" style={{ overflowY: 'auto', maxHeight: '400px' }}>
      <div style={{ fontSize: '0.65rem', color: '#00d4ff', letterSpacing: '3px', marginBottom: '1rem' }}>
        🧠 SENTINEL AI THREAT BRIEFING
      </div>

      {/* Executive Briefing */}
      <Section title="EXECUTIVE BRIEFING" color="#00d4ff">
        <ReactMarkdown>{analysis.executive_briefing}</ReactMarkdown>
      </Section>

      {/* Attack Narrative */}
      <Section title="ATTACK NARRATIVE" color="#ffb700">
        <ReactMarkdown>{analysis.attack_narrative}</ReactMarkdown>
      </Section>

      {/* Risk Assessment */}
      <Section title="RISK ASSESSMENT" color="#ff003c">
        <ReactMarkdown>{analysis.risk_assessment}</ReactMarkdown>
      </Section>

      {/* Prediction */}
      {prediction && (
        <Section title="PREDICTIVE ALERT" color="#9d4edd">
          <ReactMarkdown>{prediction}</ReactMarkdown>
        </Section>
      )}
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ marginBottom: '1.2rem' }}
    >
      <div style={{ fontSize: '0.6rem', color, letterSpacing: '2px', marginBottom: '0.4rem', fontWeight: '700' }}>
        ▸ {title}
      </div>
      <div style={{ color: '#a0b4c8', fontSize: '0.8rem', lineHeight: '1.7', paddingLeft: '0.8rem', borderLeft: `2px solid ${color}` }}>
        {children}
      </div>
    </motion.div>
  );
}
