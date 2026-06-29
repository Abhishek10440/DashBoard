// src/components/Sidebar.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

const navGroups = [
  {
    label: 'Dashboard',
    items: [
      { icon: '📊', label: 'Market Analysis' },
      { icon: '📈', label: 'Chart Analysis' },
      { icon: '⚡', label: 'Live AI Assistant', badge: 'Live', badgeColor: 'blue' },
      { icon: '🧠', label: 'AI Strategies', badge: 'New', badgeColor: 'blue' },
      { icon: '🔗', label: 'Live Trading' },
      { icon: '📓', label: 'Trade Journal' },
      { icon: '📉', label: 'Analytics' },
      { icon: '⚙️', label: 'Settings' },
    ],
  },
];

const badgeStyles = {
  blue:  { bg: 'var(--primary-soft)',  color: 'var(--primary)', border: 'var(--primary-border)' },
  green: { bg: 'var(--green-soft)',   color: 'var(--green)',  border: 'rgba(52,211,153,0.3)' },
  gold:  { bg: 'var(--gold-soft)',    color: 'var(--gold)',   border: 'rgba(251,191,36,0.3)' },
};

export default function Sidebar() {
  const [active, setActive] = useState('Market Analysis');
  let itemIndex = 0;

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
      style={{
        position: 'fixed', left: 0, top: 56, bottom: 0, width: 240,
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        padding: '20px 14px',
        zIndex: 40, overflowY: 'auto',
      }}
    >
      {navGroups.map((group) => (
        <div key={group.label} style={{ marginBottom: 20 }}>
          <p style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',  
            padding: '0 8px',
            marginBottom: 8,
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
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
                  background: isActive ? 'var(--primary-soft)' : 'transparent',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  fontSize: 14,
                  fontWeight: isActive ? 500 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  marginBottom: 2,
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
                    fontSize: 9,
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 4,
                    background: badgeStyles[item.badgeColor]?.bg || badgeStyles.blue.bg,
                    color: badgeStyles[item.badgeColor]?.color || badgeStyles.blue.color,
                    border: `1px solid ${badgeStyles[item.badgeColor]?.border || badgeStyles.blue.border}`,
                    letterSpacing: '0.04em',
                  }}>{item.badge}</span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    style={{
                      width: 3,
                      height: 16,
                      borderRadius: 4,
                      background: 'var(--primary)',
                      flexShrink: 0,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      ))}

      <div style={{ marginTop: 'auto', display: 'flex', gap: 4 }}>
        {['⚙️ Settings', '❓ Help'].map(item => (
          <button key={item} style={{
            flex: 1,
            padding: '6px 0',
            borderRadius: 6,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            fontSize: 11,
            cursor: 'pointer',
            transition: 'color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => {
            e.target.style.color = 'var(--text-secondary)';
            e.target.style.borderColor = 'var(--primary-border)';
          }}
          onMouseLeave={e => {
            e.target.style.color = 'var(--text-muted)';
            e.target.style.borderColor = 'var(--border)';
          }}
          >{item}</button>
        ))}
      </div>
    </motion.aside>
  );
}