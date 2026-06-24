import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
  LineChart, Line, Legend,
} from 'recharts';

// ─── Sample data ───────────────────────────────────────────────────────────
const pnlData = [
  { date: 'Jan', pnl: 1200, trades: 34 },
  { date: 'Feb', pnl: -400, trades: 28 },
  { date: 'Mar', pnl: 2100, trades: 45 },
  { date: 'Apr', pnl: 1800, trades: 38 },
  { date: 'May', pnl: 3200, trades: 52 },
  { date: 'Jun', pnl: 2700, trades: 41 },
  { date: 'Jul', pnl: -600, trades: 22 },
  { date: 'Aug', pnl: 4100, trades: 60 },
  { date: 'Sep', pnl: 3500, trades: 55 },
  { date: 'Oct', pnl: 5200, trades: 68 },
  { date: 'Nov', pnl: 4800, trades: 63 },
  { date: 'Dec', pnl: 6100, trades: 71 },
];

const niftyData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  nifty: 23200 + Math.sin(i * 0.4) * 400 + i * 18 + Math.random() * 120,
  bank: 56000 + Math.cos(i * 0.3) * 800 + i * 22 + Math.random() * 200,
}));

const winRateData = [
  { name: 'Mon', win: 70, loss: 30 },
  { name: 'Tue', win: 55, loss: 45 },
  { name: 'Wed', win: 80, loss: 20 },
  { name: 'Thu', win: 65, loss: 35 },
  { name: 'Fri', win: 72, loss: 28 },
];

const marketCards = [
  { name: 'NIFTY 50',   val: '23,824.1', chg: '-1.09%', up: false, sub: 'NSE · India' },
  { name: 'Bank Nifty', val: '57,183.7', chg: '-0.70%', up: false, sub: 'NSE · Banking' },
  { name: 'Bitcoin',    val: '$62,357',  chg: '-1.86%', up: false, sub: 'BTC/USDT' },
  { name: 'Gold',       val: '$2,341',   chg: '+0.32%', up: true,  sub: 'XAUUSD' },
];

const gainers = [
  { name: 'Maase Inc.',      pct: '+31.44%' },
  { name: 'Quantinuum Inc.', pct: '+13.66%' },
  { name: 'Infleqtion Inc.', pct: '+12.91%' },
  { name: 'Varonis Systems', pct: '+9.51%'  },
];
const losers = [
  { name: 'Primoris Svcs',   pct: '-23.56%' },
  { name: 'AXT Inc',         pct: '-15.78%' },
  { name: 'Sandisk Corp',    pct: '-13.85%' },
  { name: 'Camtek Ltd.',     pct: '-12.80%' },
];

// ─── Custom tooltip ────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#16181F', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 8, padding: '8px 12px',
    }}>
      <p style={{ color: 'var(--text-muted)', fontSize: 11, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 12, fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' && p.value < 0 ? '-$' + Math.abs(p.value).toLocaleString() : (p.name === 'pnl' ? '$' : '') + (typeof p.value === 'number' ? p.value.toLocaleString() : p.value)}
        </p>
      ))}
    </div>
  );
};

// ─── Section wrapper ───────────────────────────────────────────────────────
function Section({ title, subtitle, delay = 0, children, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 12, padding: '18px 20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{title}</h3>
          {subtitle && <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </motion.div>
  );
}

// ─── Tab button ────────────────────────────────────────────────────────────
function TabBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 10px', borderRadius: 6, border: 'none',
        background: active ? 'var(--violet-soft)' : 'transparent',
        color: active ? '#C4B5FD' : 'var(--text-muted)',
        fontSize: 11, fontWeight: 500, cursor: 'pointer',
        border: active ? '1px solid var(--violet-border)' : '1px solid transparent',
        transition: 'all 0.15s',
      }}
    >{label}</button>
  );
}

export default function ChartSection() {
  const [pnlTab, setPnlTab] = useState('P&L');
  const [chartTab, setChartTab] = useState('NIFTY');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* ── Market snapshot cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}
      >
        {marketCards.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.28 + i * 0.06 }}
            whileHover={{ y: -2 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10, padding: '12px 14px',
              cursor: 'default',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = m.up ? 'rgba(0,200,150,0.3)' : 'rgba(255,77,106,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)' }}>{m.name}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 5,
                background: m.up ? 'var(--green-soft)' : 'var(--red-soft)',
                color: m.up ? 'var(--green)' : 'var(--red)',
              }}>{m.chg}</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-mono)', letterSpacing: '-0.03em' }}>{m.val}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{m.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Two col: main chart + gainers/losers ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>

        {/* P&L / Indices chart */}
        <Section
          title={pnlTab === 'P&L' ? 'Monthly P&L' : pnlTab === 'Indices' ? 'Index Performance' : 'Win Rate by Day'}
          subtitle="Last 12 months of trading activity"
          delay={0.3}
          action={
            <div style={{ display: 'flex', gap: 4 }}>
              {['P&L', 'Indices', 'Win Rate'].map(t => (
                <TabBtn key={t} label={t} active={pnlTab === t} onClick={() => setPnlTab(t)} />
              ))}
            </div>
          }
        >
          <ResponsiveContainer width="100%" height={220}>
            {pnlTab === 'P&L' ? (
              <AreaChart data={pnlData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: '#4A4D61', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4A4D61', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="pnl" name="pnl" stroke="#7C5CFC" strokeWidth={2} fill="url(#pnlGrad)" dot={false} activeDot={{ r: 4, fill: '#7C5CFC' }} />
              </AreaChart>
            ) : pnlTab === 'Indices' ? (
              <LineChart data={niftyData.slice(-14)} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#4A4D61', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="n" tick={{ fill: '#4A4D61', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <YAxis yAxisId="b" orientation="right" tick={{ fill: '#4A4D61', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: '#8B8FA8' }} />
                <Line yAxisId="n" type="monotone" dataKey="nifty" name="NIFTY" stroke="#7C5CFC" strokeWidth={2} dot={false} />
                <Line yAxisId="b" type="monotone" dataKey="bank"  name="BANKNIFTY" stroke="#00C896" strokeWidth={2} dot={false} />
              </LineChart>
            ) : (
              <BarChart data={winRateData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#4A4D61', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#4A4D61', fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="win"  name="Win%"  fill="#00C896" radius={[4,4,0,0]} maxBarSize={28} />
                <Bar dataKey="loss" name="Loss%" fill="#FF4D6A" radius={[4,4,0,0]} maxBarSize={28} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Section>

        {/* Gainers + Losers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { title: 'Top Gainers', icon: '▲', color: 'var(--green)', items: gainers, up: true },
            { title: 'Top Losers',  icon: '▼', color: 'var(--red)',   items: losers,  up: false },
          ].map((group, gi) => (
            <Section key={group.title} title={group.title} delay={0.32 + gi * 0.06}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {group.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + gi * 0.08 + i * 0.05 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '5px 0',
                      borderBottom: i < group.items.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: group.color, fontFamily: 'var(--font-mono)' }}>{item.pct}</span>
                  </motion.div>
                ))}
              </div>
            </Section>
          ))}
        </div>
      </div>

      {/* ── Trade activity bar chart ── */}
      <Section title="Trade Volume" subtitle="Monthly trade count" delay={0.4}>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={pnlData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: '#4A4D61', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#4A4D61', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="trades" name="trades" fill="#7C5CFC" radius={[4,4,0,0]} maxBarSize={22}
              onMouseEnter={(_, i, e) => {}} />
          </BarChart>
        </ResponsiveContainer>
      </Section>

      {/* ── AI Summary ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.46 }}
        style={{
          background: 'linear-gradient(135deg, rgba(124,92,252,0.08) 0%, rgba(0,200,150,0.04) 100%)',
          border: '1px solid var(--violet-border)',
          borderRadius: 12, padding: '16px 20px',
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: 'var(--violet)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, flexShrink: 0,
        }}>✨</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>AI Daily Summary</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 'auto' }}>Updated 11:32 PM</span>
          </div>
          {/* <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Global markets are experiencing bearish sentiment today. NIFTY 50 is down over 1% with significant selling pressure across sectors.
            Bitcoin and Ethereum are showing notable declines, indicating a broad market correction. VIX at 13.94 signals medium volatility —
            consider tighter stops and reduced position sizing until momentum stabilises.
          </p> */}
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {['S: 23,784', 'R: 24,135', 'VIX 13.94', 'Medium Vol'].map((tag, i) => (
              <span key={i} style={{
                fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 6,
                background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}