// src/pages/Dashboard.jsx
import { motion } from 'framer-motion';
import {
  RiExchangeLine, RiLineChartLine, RiRobot2Line, RiCrosshairLine,
  RiArrowRightUpLine, RiAddLine, RiRefreshLine,
  RiCheckLine, RiSparklingLine,
} from 'react-icons/ri';
import { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import ChartSection from '../components/ChartSection';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';

// ── Typewriter hook ──
function useTypewriter(text, speed = 45) {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayed('');
    setIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [index, text, speed]);

  return { displayed, isComplete };
}

// ── Stat cards ──
const STATS = [
  { icon: RiExchangeLine,  label: 'Total Trades', sublabel: 'Executed', value: 1240, accent: 'blue', change: '8%',  changeUp: true,  index: 0 },
  { icon: RiLineChartLine, label: 'Total P&L',    sublabel: 'Profit',   value: 5600, accent: 'blue', prefix: '$',   change: '12%', changeUp: true, index: 1 },
  { icon: RiRobot2Line,    label: 'Active Bots',  sublabel: 'Running',  value: 12,   accent: 'blue', index: 2 },
  { icon: RiCrosshairLine, label: 'Win Rate',     sublabel: 'Success',  value: 78,   accent: 'blue', suffix: '%',   change: '3%',  changeUp: true, index: 3 },
];

// ── Modules ──
const MODULES = [
  { icon: '⚡', label: 'Live AI Assistant',  desc: 'Real-time setups & entries',  tag: 'Live' },
  { icon: '📊', label: 'Chart Analysis',     desc: 'Upload chart for AI review',  tag: 'AI' },
  { icon: '🧠', label: 'AI Strategies',      desc: 'Pre-built backtested bots',   tag: 'New' },
  { icon: '📓', label: 'Trade Journal',      desc: 'Log trades & lessons',        tag: null },
  { icon: '📉', label: 'Analytics',          desc: 'Win rate, drawdown, Sharpe',  tag: 'AI' },
  { icon: '💰', label: 'Capital Allocation', desc: 'Risk-controlled sizing',      tag: null },
];

// ── Onboarding steps ──
const STEPS = [
  'View AI Market Pulse',
  'Create your first strategy',
  'Log a trade in the journal',
  'Upload your first chart',
  'Run your first paper bot',
  'Connect your broker',
];

// ── Market Pulse Data ──
const MARKET_DATA = [
  { label: 'NSEI', val: '23,945.5', chg: '+0.51%', up: true },
  { label: 'NSEBANK', val: '57,675.6', chg: '+0.86%', up: true },
  { label: 'BSESN', val: '76,688.39', chg: '+0.64%', up: true },
  { label: 'BTC', val: '60,021.61', chg: '+0.50%', up: true },
  { label: 'ETH', val: '$1,577.31', chg: '+0.80%', up: true },
  { label: 'GOLD', val: '$2,341.20', chg: '+0.32%', up: true },
];

// ── Gainers / Losers ──
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

const card = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  borderRadius: 14,
};

// ── Step row component ──
function StepRow({ label, done, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '13px 0',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          border: done ? 'none' : `1.5px solid ${hovered ? 'var(--primary)' : 'var(--text-dim)'}`,
          background: done ? 'var(--primary)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.2s',
        }}>
          {done && <RiCheckLine size={11} style={{ color: '#fff' }} />}
        </div>
        <span style={{
          fontSize: 13,
          color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
          transition: 'color 0.15s',
        }}>{label}</span>
      </div>
      <motion.span
        animate={{ x: hovered ? 3 : 0 }}
        transition={{ duration: 0.15 }}
        style={{ color: 'var(--text-primary)', fontSize: 16, marginRight: 4 }}
      >→</motion.span>
    </motion.div>
  );
}

export default function Dashboard() {
  const { user } = useUser();
  const displayName = user.name || 'Guest';
  const { displayed, isComplete } = useTypewriter(displayName);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 1000));
    setRefreshing(false);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 22 }}>

      {/* ── Greeting ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}
      >
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.4px' }}>
  Welcome back,{' '}
  <span style={{ color: 'var(--text-primary)' }}>{displayed}</span>  {/* ← Change var(--primary) to var(--text-primary) */}
  <span style={{ opacity: isComplete ? 0 : 1, transition: 'opacity 0.1s' }}>|</span>
  {' '}👋
</h1>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Your command center for AI-powered trading. Navigate to any module below.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={handleRefresh}
            style={{
              width: 36, height: 36, borderRadius: 8,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              color: 'var(--text-dim)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.span animate={{ rotate: refreshing ? 360 : 0 }} transition={{ duration: 0.6, ease: 'linear', repeat: refreshing ? Infinity : 0 }}>
              <RiRefreshLine size={15} />
            </motion.span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 24px var(--shadow-glow)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 20px', borderRadius: 8,
              background: 'var(--primary)',
              border: 'none',
              color: '#fff',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}
          >
            <RiAddLine size={15} /> Create Strategy
          </motion.button>
        </div>
      </motion.div>

      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {STATS.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* ── Onboarding ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        style={{ ...card, padding: '22px 28px', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 200, height: 200,
          borderRadius: '50%', background: 'var(--shadow-glow)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>Get started with QuantMentor</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>0/6 · 0%</span>
        </div>

        <div style={{ height: 2, background: 'var(--border)', borderRadius: 4, marginBottom: 20, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }} animate={{ width: '0%' }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            style={{ height: '100%', background: 'var(--primary)', borderRadius: 4 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
          <div>
            {STEPS.slice(0, 3).map((s, i) => <StepRow key={s} label={s} done={false} delay={0.32 + i * 0.06} />)}
          </div>
          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 32 }}>
            {STEPS.slice(3).map((s, i) => <StepRow key={s} label={s} done={false} delay={0.38 + i * 0.06} />)}
          </div>
        </div>
      </motion.div>

      {/* ── Market Pulse ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        style={{ ...card, padding: '40px 24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 16 }}>📊</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>Market Pulse</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 8,
        }}>
          {MARKET_DATA.map((item) => (
            <div key={item.label} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--primary-border)';
              e.currentTarget.style.background = 'var(--primary-soft)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
            }}
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{item.label}</span>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{item.val}</span>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: item.up ? 'var(--green)' : 'var(--red)',
              }}>{item.chg}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Chart + Gainers/Losers ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 272px', gap: 14 }}>
        <ChartSection />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { title: 'Top Gainers', items: GAINERS, up: true },
            { title: 'Top Losers',  items: LOSERS,  up: false },
          ].map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38 + gi * 0.08 }}
              style={{ ...card, padding: '18px', flex: 1 }}
            >
              <p style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: group.up ? 'var(--green)' : 'var(--red)',
                marginBottom: 14,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {group.up ? '▲' : '▼'} {group.title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {group.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.44 + gi * 0.08 + i * 0.05 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '7px 8px', borderRadius: 6,
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth: 120 }}>{item.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: group.up ? 'var(--green)' : 'var(--red)', fontFamily: 'monospace' }}>{item.pct}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── AI Summary ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44 }}
        style={{
          ...card,
          padding: '18px 22px',
          display: 'flex', gap: 16, alignItems: 'flex-start',
          background: 'linear-gradient(135deg, var(--primary-soft) 0%, var(--bg-surface) 60%)',
          border: '1px solid var(--primary-border)',
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'var(--primary-soft)',
            border: '1px solid var(--primary-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <RiSparklingLine size={17} style={{ color: 'var(--primary)' }} />
        </motion.div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>AI Market Summary</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 'auto' }}>Updated 11:32 PM</span>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            Broad bearish sentiment today. NIFTY 50 down 1%+, crypto declining across the board.
            VIX at 13.94 — medium volatility. Consider tighter stops until momentum stabilises.
          </p>
          <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
            {[['S: 23,784', 'var(--red)'], ['R: 24,135', 'var(--green)'], ['VIX 13.94', 'var(--gold)'], ['Medium Vol', 'var(--text-muted)']].map(([tag, color]) => (
              <span key={tag} style={{
                fontSize: 10, fontWeight: 600,
                padding: '3px 9px', borderRadius: 6,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                color,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Modules ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Trading Modules
          </p>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>6 available</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.label}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 + i * 0.06 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              style={{
                ...card, padding: '18px', cursor: 'pointer',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--primary-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                const accent = e.currentTarget.querySelector('.accent-line');
                if (accent) accent.style.opacity = '1';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
                const accent = e.currentTarget.querySelector('.accent-line');
                if (accent) accent.style.opacity = '0';
              }}
            >
              <div className="accent-line" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, var(--primary), transparent)`,
                opacity: 0, transition: 'opacity 0.2s',
              }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: 'var(--primary-soft)',
                  border: '1px solid var(--primary-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                }}>{mod.icon}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {mod.tag && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                      background: 'var(--primary-soft)',
                      color: 'var(--primary)',
                      border: '1px solid var(--primary-border)',
                      letterSpacing: '0.04em',
                    }}>{mod.tag}</span>
                  )}
                  <div style={{
                    width: 24, height: 24, borderRadius: 6,
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-dim)',
                  }}>
                    <RiArrowRightUpLine size={12} />
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 5 }}>{mod.label}</p>
              <p style={{ fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{mod.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Strategies CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.62 }}
        style={{
          ...card,
          padding: '40px 24px', textAlign: 'center',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--primary-soft) 100%)',
        }}
      >
        <motion.p
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 32, marginBottom: 12 }}
        >🚀</motion.p>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>Your Strategies</p>
        <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
          Start your first paper bot in 30 seconds — no broker required.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: 'var(--shadow-glow)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '10px 22px', borderRadius: 8,
              background: 'var(--primary)', border: 'none',
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            }}
          >+ Build Strategy</motion.button>
          <motion.button
            whileHover={{ scale: 1.02, borderColor: 'var(--primary-border)', color: 'var(--text-primary)' }}
            style={{
              padding: '10px 22px', borderRadius: 8,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >Browse Marketplace</motion.button>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}