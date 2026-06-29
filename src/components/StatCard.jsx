// src/components/StatCard.jsx
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function MiniSparkline({ data, color }) {
  if (!data || data.length < 2) return null;
  const w = 80, h = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  const pathD = `M ${pts.join(' L ')}`;
  const areaD = `M ${pts.join(' L ')} L ${w},${h} L 0,${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sg-${color.replace('#','')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CountUp({ target, prefix = '', suffix = '', decimals = 0, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const start = useRef(null);

  useEffect(() => {
    const num = parseFloat(String(target).replace(/[^0-9.-]/g, ''));
    start.current = null;
    const step = (ts) => {
      if (!start.current) start.current = ts;
      const prog = Math.min((ts - start.current) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setDisplay(num * ease);
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();

  return <span>{prefix}{formatted}{suffix}</span>;
}

const accentMap = {
  blue:   { color: 'var(--accent)',    bg: 'var(--accent-soft)',  border: 'var(--accent-border)' },
  indigo: { color: 'var(--indigo)',    bg: 'var(--indigo-soft)',  border: 'var(--indigo-border)' },
  green:  { color: 'var(--green)',     bg: 'var(--green-soft)',   border: 'rgba(52,211,153,0.2)' },
  red:    { color: 'var(--red)',       bg: 'var(--red-soft)',     border: 'rgba(248,113,113,0.2)' },
  gold:   { color: 'var(--gold)',      bg: 'var(--gold-soft)',    border: 'rgba(251,191,36,0.2)' },
};

export default function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  change,
  changeUp,
  icon: Icon,
  accent = 'blue',
  sparkData,
  index = 0,
  sublabel,
}) {
  const { color, bg, border } = accentMap[accent] || accentMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '18px 20px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = border;
        e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${color}, transparent)`,
        borderRadius: '12px 12px 0 0',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9,
          background: bg, border: `1px solid ${border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, flexShrink: 0, color: color,
        }}>
          {Icon && <Icon size={17} />}
        </div>

        {change && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 3,
            padding: '3px 10px', borderRadius: 6,
            background: changeUp ? 'var(--green-soft)' : 'var(--red-soft)',
            fontSize: 11, fontWeight: 600,
            color: changeUp ? 'var(--green)' : 'var(--red)',
          }}>
            {changeUp ? '▲' : '▼'} {change}
          </div>
        )}
      </div>

      <p style={{
        fontSize: 11, fontWeight: 500, letterSpacing: '0.05em',
        textTransform: 'uppercase', color: 'var(--text-secondary)',
        marginBottom: 2,
      }}>{title}</p>

      <div style={{
        fontSize: 26, fontWeight: 700, letterSpacing: '-0.04em',
        color: 'var(--text-primary)', lineHeight: 1,
        fontFamily: 'var(--font-mono)', marginBottom: 4,
      }}>
        <CountUp target={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </div>

      {sublabel && (
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sublabel}</p>
      )}

      {sparkData && (
        <div style={{ marginTop: 10 }}>
          <MiniSparkline data={sparkData} color={color} />
        </div>
      )}
    </motion.div>
  );
}