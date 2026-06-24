import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import ChartSection from '../components/ChartSection';
import Footer from '../components/Footer';

const stats = [
  {
    title: 'Total Trades',
    value: 1240,
    icon: '🔁',
    accent: 'violet',
    change: '8.2%',
    changeUp: true,
    subLabel: 'vs last month',
    sparkData: [30, 38, 28, 44, 52, 41, 60, 55, 68, 63, 71, 80],
  },
  {
    title: 'Total P&L',
    value: 5600,
    prefix: '$',
    icon: '💹',
    accent: 'green',
    change: '12.4%',
    changeUp: true,
    subLabel: 'all time',
    sparkData: [1200, 800, 2100, 1800, 3200, 2700, 1400, 4100, 3500, 5200, 4800, 6100],
  },
  {
    title: 'Active Bots',
    value: 12,
    icon: '🤖',
    accent: 'gold',
    subLabel: '3 paper · 9 live',
    sparkData: [4, 5, 6, 7, 8, 9, 10, 9, 11, 12, 12, 12],
  },
  {
    title: 'Win Rate',
    value: 78,
    suffix: '%',
    icon: '🎯',
    accent: 'green',
    change: '3.1%',
    changeUp: true,
    subLabel: 'last 30 trades',
    sparkData: [65, 70, 68, 74, 72, 76, 75, 78, 77, 79, 78, 78],
  },
];

const modules = [
  { icon: '⚡', label: 'Live AI Assistant', desc: 'Scans chart every few seconds', tag: 'Live', tagColor: 'green', accent: '#00C896' },
  { icon: '📊', label: 'Chart Analysis',    desc: 'Upload TradingView screenshots', tag: 'AI',   tagColor: 'violet', accent: '#7C5CFC' },
  { icon: '🧠', label: 'AI Strategies',     desc: 'Pre-built backtested strategies', tag: 'New', tagColor: 'gold', accent: '#F0A500' },
  { icon: '📓', label: 'Trade Journal',     desc: 'Log trades with emotions & tags', tag: null, accent: '#7C5CFC' },
  { icon: '📉', label: 'Analytics',         desc: 'Win rate, drawdown, Sharpe',      tag: 'AI', tagColor: 'violet', accent: '#7C5CFC' },
  { icon: '💰', label: 'Capital Allocation',desc: 'Automated risk controls',          tag: null, accent: '#F0A500' },
];

const tagStyles = {
  green:  { bg: 'rgba(0,200,150,0.15)',  color: '#00C896', border: 'rgba(0,200,150,0.3)' },
  violet: { bg: 'rgba(124,92,252,0.15)', color: '#A78BFA', border: 'rgba(124,92,252,0.3)' },
  gold:   { bg: 'rgba(240,165,0,0.15)',  color: '#F0A500', border: 'rgba(240,165,0,0.3)' },
};

// Onboarding steps
const onboardSteps = [
  { label: 'View AI Market Pulse', done: false },
  { label: 'Upload your first chart', done: false },
  { label: 'Create your first strategy', done: false },
  { label: 'Run your first paper bot', done: false },
  { label: 'Log a trade in the journal', done: false },
  { label: 'Connect your broker', done: false },
];

export default function Dashboard() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>

      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ marginBottom: 24 }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
              Welcome back, <span style={{ color: '#A78BFA', fontWeight: 500 }}>Abhishek Shah</span> 👋
            </p>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>
              Command Center
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              padding: '8px 14px', borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500, cursor: 'pointer',
            }}>📥 Import Trades</button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '8px 16px', borderRadius: 8,
                background: 'var(--violet)', border: 'none',
                color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >+ New Strategy</motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── Stat cards ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12, marginBottom: 20,
      }}>
        {stats.map((s, i) => (
          <StatCard key={s.title} {...s} index={i} />
        ))}
      </div>

      {/* ── Onboarding progress ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(124,92,252,0.08), rgba(124,92,252,0.03))',
          border: '1px solid var(--violet-border)',
          borderRadius: 12, padding: '14px 18px',
          marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#C4B5FD' }}>Get started · 0 / 6</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>0%</span>
          </div>
          <div style={{ height: 4, background: 'rgba(124,92,252,0.15)', borderRadius: 4, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '0%' }}
              style={{ height: '100%', background: 'var(--violet)', borderRadius: 4 }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {onboardSteps.map((step) => (
            <div key={step.label} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: 20,
              background: step.done ? 'rgba(0,200,150,0.1)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${step.done ? 'rgba(0,200,150,0.3)' : 'var(--border)'}`,
              fontSize: 11, color: step.done ? 'var(--green)' : 'var(--text-muted)',
              cursor: 'pointer',
            }}>
              <span>{step.done ? '✓' : '○'}</span>
              <span>{step.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Charts & Market ── */}
      <ChartSection />

      {/* ── Trading modules grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: 20 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600 }}>Trading Modules</h2>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>6 modules available</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {modules.map((mod, i) => (
            <motion.div
              key={mod.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 + i * 0.06 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12, padding: '16px',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${mod.accent}44`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              {/* Top accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, ${mod.accent}88, transparent)`,
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: `${mod.accent}18`,
                  border: `1px solid ${mod.accent}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>
                  {mod.icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {mod.tag && (() => {
                    const ts = tagStyles[mod.tagColor] || tagStyles.violet;
                    return (
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                        background: ts.bg, color: ts.color, border: `1px solid ${ts.border}`,
                        letterSpacing: '0.05em',
                      }}>{mod.tag}</span>
                    );
                  })()}
                  <span style={{
                    width: 22, height: 22, borderRadius: 6,
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: 'var(--text-muted)',
                  }}>↗</span>
                </div>
              </div>

              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{mod.label}</p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>{mod.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Your Strategies empty state ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.62 }}
        style={{
          marginTop: 20,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', gap: 10,
        }}
      >
        <div style={{ fontSize: 36 }}>🚀</div>
        <h3 style={{ fontSize: 15, fontWeight: 600 }}>Your Strategies</h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 340, lineHeight: 1.6 }}>
          Start your first paper bot in 30 seconds — no broker required. Build a strategy or browse the marketplace.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              padding: '8px 18px', borderRadius: 8,
              background: 'var(--violet)', border: 'none',
              color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}
          >+ Build a Strategy</motion.button>
          <button style={{
            padding: '8px 18px', borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500, cursor: 'pointer',
          }}>Browse Marketplace</button>
          <button style={{
            padding: '8px 18px', borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500, cursor: 'pointer',
          }}>📊 Upload a Chart</button>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}