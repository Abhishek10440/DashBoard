import { motion } from 'framer-motion';
import { useState } from 'react';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { icon: '⊞', label: 'Dashboard' },
      { icon: '📈', label: 'Market Pulse' },
    ],
  },
  {
    label: 'Trading',
    items: [
      { icon: '⚡', label: 'Live AI Assistant', badge: 'Live', badgeColor: 'green' },
      { icon: '📊', label: 'Chart Analysis', badge: 'AI', badgeColor: 'violet' },
      { icon: '🤖', label: 'Active Bots' },
      { icon: '🔗', label: 'Live Trading' },
    ],
  },
  {
    label: 'Strategy',
    items: [
      { icon: '🧠', label: 'AI Strategies', badge: 'New', badgeColor: 'gold' },
      { icon: '💰', label: 'Capital Allocation' },
    ],
  },
  {
    label: 'Review',
    items: [
      { icon: '📓', label: 'Trade Journal' },
      { icon: '📉', label: 'Analytics' },
    ],
  },
];

const badgeStyles = {
  green:  { bg: 'rgba(0,200,150,0.15)',  color: 'var(--green)', border: 'rgba(0,200,150,0.3)' },
  violet: { bg: 'rgba(124,92,252,0.15)', color: '#A78BFA',      border: 'rgba(124,92,252,0.3)' },
  gold:   { bg: 'rgba(240,165,0,0.15)',  color: 'var(--gold)',  border: 'rgba(240,165,0,0.3)' },
};

export default function Sidebar() {
  const [active, setActive] = useState('Dashboard');
  let itemIndex = 0;

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
      style={{
        position: 'fixed', left: 0, top: 64, bottom: 0, width: 224,
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        padding: '16px 10px',
        zIndex: 40, overflowY: 'auto',
      }}
    >
      {navGroups.map((group) => (
        <div key={group.label} style={{ marginBottom: 20 }}>
          <p style={{
            fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            padding: '0 8px', marginBottom: 4,
          }}>{group.label}</p>

          {group.items.map((item) => {
            const delay = 0.12 + itemIndex++ * 0.04;
            const isActive = active === item.label;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration: 0.3 }}
                whileHover={{ x: 2 }}
                onClick={() => setActive(item.label)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                  padding: '7px 10px', borderRadius: 8,
                  border: isActive ? '1px solid var(--violet-border)' : '1px solid transparent',
                  background: isActive ? 'var(--violet-soft)' : 'transparent',
                  color: isActive ? '#C4B5FD' : 'var(--text-secondary)',
                  fontSize: 12, fontWeight: isActive ? 500 : 400,
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s',
                  marginBottom: 1,
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <span style={{ fontSize: 15, lineHeight: 1 }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                    background: badgeStyles[item.badgeColor].bg,
                    color: badgeStyles[item.badgeColor].color,
                    border: `1px solid ${badgeStyles[item.badgeColor].border}`,
                    letterSpacing: '0.04em',
                  }}>{item.badge}</span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    style={{ width: 3, height: 16, borderRadius: 4, background: 'var(--violet)', flexShrink: 0 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      ))}

      {/* Bottom CTA */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{
          padding: 12, borderRadius: 10,
          background: 'linear-gradient(135deg, rgba(124,92,252,0.15) 0%, rgba(124,92,252,0.05) 100%)',
          border: '1px solid var(--violet-border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 14 }}>🧪</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#C4B5FD' }}>Paper Mode</span>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 8 }}>
            No real capital at risk. Connect broker to trade live.
          </p>
          <button style={{
            width: '100%', padding: '6px 0', borderRadius: 6,
            background: 'var(--violet)', border: 'none',
            color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer',
          }}>
            Connect Broker →
          </button>
        </div>

        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {['⚙️ Settings', '❓ Help'].map(item => (
            <button key={item} style={{
              flex: 1, padding: '6px 0', borderRadius: 6,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)', fontSize: 11, cursor: 'pointer',
            }}>{item}</button>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}