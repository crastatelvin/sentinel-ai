import { motion } from 'framer-motion';
import StatusBar from '../components/StatusBar';
import ThreatCounter from '../components/ThreatCounter';
import TerminalFeed from '../components/TerminalFeed';
import ThreatRadar from '../components/ThreatRadar';
import TimelineChart from '../components/TimelineChart';
import ThreatTable from '../components/ThreatTable';
import AIBriefing from '../components/AIBriefing';
import RemediationPanel from '../components/RemediationPanel';
import AttackChain from '../components/AttackChain';
import GlobeMap from '../components/GlobeMap';

export default function DashboardPage({ data, onReset }) {
  const { summary, threats, chains, ai_analysis, prediction, map_data } = data;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e1a' }}>
      {/* Top status bar */}
      <StatusBar threatCount={summary?.total || 0} />

      {/* Main dashboard */}
      <div style={{ padding: '1rem 1.5rem' }}>
        {/* Row 1: Counter + Globe + Radar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <ThreatCounter summary={summary} />
          <GlobeMap mapData={map_data} />
          <ThreatRadar summary={summary} />
        </div>

        {/* Row 2: Terminal + Timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <TerminalFeed threats={threats || []} />
          <TimelineChart threats={threats || []} />
        </div>

        {/* Row 3: Threat Table */}
        <div style={{ marginBottom: '1rem' }}>
          <ThreatTable threats={threats || []} />
        </div>

        {/* Row 4: AI Briefing + Remediation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <AIBriefing analysis={ai_analysis} prediction={prediction} />
          <RemediationPanel remediation={ai_analysis?.remediation_playbook} />
        </div>

        {/* Row 5: Attack Chains */}
        <AttackChain chains={chains} />

        {/* Reset button */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingBottom: '2rem' }}>
          <button
            onClick={onReset}
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,255,65,0.3)',
              color: '#00ff41',
              padding: '0.5rem 2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono',
              fontSize: '0.75rem',
              letterSpacing: '2px'
            }}
          >
            ↩ UPLOAD NEW LOG
          </button>
        </div>
      </div>
    </div>
  );
}
