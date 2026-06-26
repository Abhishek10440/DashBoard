// src/pages/Dashboard.jsx
import { motion } from 'framer-motion';
import {
  RiExchangeLine, RiLineChartLine, RiRobot2Line, RiCrosshairLine,
  RiArrowRightUpLine, RiAddLine,
} from 'react-icons/ri';
import StatCard from '../components/StatCard';
import ChartSection from '../components/ChartSection';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';

const STATS = [
  { icon: RiExchangeLine,  label: 'Total Trades', value: 1240, accent: 'cyan',  change: '8%',  changeUp: true,  index: 0 },
  { icon: RiLineChartLine, label: 'Total P&L',    value: 5600, accent: 'cyan',  prefix: '$',   change: '12%', changeUp: true, index: 1 },
  { icon: RiRobot2Line,    label: 'Active Bots',  value: 12,   accent: 'cyan',  index: 2 },
  { icon: RiCrosshairLine, label: 'Win Rate',      value: 78,   accent: 'cyan',  suffix: '%',   change: '3%',  changeUp: true, index: 3 },
];

const MODULES = [
  { icon: '⚡', label: 'Live AI Assistant', desc: 'Real-time setups & entries', tag: 'Live', tagBg: 'rgba(0,212,170,0.1)',  tagColor: '#00d4aa', tagBorder: 'rgba(0,212,170,0.25)' },
  { icon: '📊', label: 'Chart Analysis',    desc: 'Upload chart for AI review', tag: 'AI',   tagBg: 'rgba(0,212,170,0.1)',  tagColor: '#00d4aa', tagBorder: 'rgba(0,212,170,0.25)' },
  { icon: '🧠', label: 'AI Strategies',     desc: 'Pre-built backtested bots',  tag: 'New',  tagBg: 'rgba(251,191,36,0.1)', tagColor: '#fbbf24', tagBorder: 'rgba(251,191,36,0.25)' },
  { icon: '📓', label: 'Trade Journal',     desc: 'Log trades & lessons',       tag: null },
  { icon: '📉', label: 'Analytics',         desc: 'Win rate, drawdown, Sharpe', tag: 'AI',   tagBg: 'rgba(0,212,170,0.1)',  tagColor: '#00d4aa', tagBorder: 'rgba(0,212,170,0.25)' },
  { icon: '💰', label: 'Capital Allocation',desc: 'Risk-controlled sizing',     tag: null },
];

const GAINERS = [
  { name: 'Maase Inc.',      pct: '+31.4%' },
  { name: 'Quantinuum Inc.', pct: '+13.6%' },
  { name: 'Infleqtion Inc.', pct: '+12.9%' },
  { name: 'Varonis Systems', pct: '+9.5%'  },
];

const LOSERS = [
  { name: 'Primoris Svcs',  pct: '-23.5%' },
  { name: 'AXT Inc',        pct: '-15.7%' },
  { name: 'Sandisk Corp',   pct: '-13.8%' },
  { name: 'Camtek Ltd.',    pct: '-12.8%' },
];

const STEPS_LEFT  = ['View AI Market Pulse', 'Create your first strategy', 'Log a trade in the journal'];
const STEPS_RIGHT = ['Upload your first chart', 'Run your first paper bot', 'Connect your broker'];

const card = {
  background: '#0f1525',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: 12,
};

export default function Dashboard() {
  const { user } = useUser();
  const displayName = user.name || 'Guest';

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Greeting ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 4 }}>
            Welcome back, <span style={{ color: '#c4b5fd' }}>{displayName}</span> 👋
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            Your command center for AI-powered trading. Navigate to any module below.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 20px', borderRadius: 8,
            background: '#00d4aa', border: 'none',
            color: '#0a0d1a', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}
        >
          <RiAddLine size={15} /> Create Strategy
        </motion.button>
      </motion.div>

      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* ── Onboarding ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        style={{ ...card, padding: '20px 24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>Get started with QuantMentor</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>0/6 · 0%</span>
        </div>

        <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 4, marginBottom: 20, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }} animate={{ width: '0%' }}
            style={{ height: '100%', background: '#00d4aa', borderRadius: 4 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {STEPS_LEFT.map(s => (
              <div key={s} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{s}</span>
                </div>
                <span style={{ color: '#00d4aa', fontSize: 16, marginRight: 24 }}>→</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: 24 }}>
            {STEPS_RIGHT.map(s => (
              <div key={s} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{s}</span>
                </div>
                <span style={{ color: '#00d4aa', fontSize: 16 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Chart + Gainers/Losers ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 12 }}>
        <ChartSection />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { title: 'Top Gainers', items: GAINERS, up: true },
            { title: 'Top Losers',  items: LOSERS,  up: false },
          ].map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38 + gi * 0.07 }}
              style={{ ...card, padding: '16px', flex: 1 }}
            >
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: group.up ? '#061411' : '#f87171' }}>{group.up ? '▲' : '▼'}</span>
                {group.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.42 + gi * 0.07 + i * 0.04 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 120 }}>{item.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: group.up ? '#00d4aa' : '#f87171', fontFamily: 'monospace' }}>{item.pct}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Modules ── */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Modules</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.label}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46 + i * 0.05 }}
              whileHover={{ y: -2, transition: { duration: 0.12 } }}
              style={{ ...card, padding: '16px', cursor: 'pointer', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,212,170,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{mod.icon}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {mod.tag && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                      background: mod.tagBg, color: mod.tagColor, border: `1px solid ${mod.tagBorder}`,
                    }}>{mod.tag}</span>
                  )}
                  <RiArrowRightUpLine size={13} style={{ color: 'rgba(255,255,255,0.15)' }} />
                </div>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#e8e9f0', marginBottom: 4 }}>{mod.label}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>{mod.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Empty Strategies CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ ...card, padding: '32px 24px', textAlign: 'center' }}
      >
        <p style={{ fontSize: 28, marginBottom: 8 }}>🚀</p>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f5', marginBottom: 6 }}>Your Strategies</p>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Start your first paper bot — no broker needed.</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            style={{ padding: '8px 18px', borderRadius: 8, background: '#00d4aa', border: 'none', color: '#0a0d1a', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
          >+ Build Strategy</motion.button>
          <button style={{
            padding: '8px 18px', borderRadius: 8,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer',
          }}>Browse Marketplace</button>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}