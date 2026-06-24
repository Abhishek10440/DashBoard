import { motion } from 'framer-motion';
import { useState } from 'react';

const tickerItems = [
  { name: 'NSEI',    val: '23,824', chg: '-1.09%', up: false },
  { name: 'BANKNIFTY', val: '57,183', chg: '-0.70%', up: false },
  { name: 'BSESN',  val: '76,200', chg: '-1.24%', up: false },
  { name: 'BTC',    val: '$62,357', chg: '-1.86%', up: false },
  { name: 'ETH',    val: '$1,658',  chg: '-3.10%', up: false },
  { name: 'GOLD',   val: '$2,341',  chg: '+0.32%', up: true  },
  { name: 'USD/INR',val: '83.42',   chg: '+0.08%', up: true  },
  { name: 'VIX',    val: '13.94',   chg: '+2.1%',  up: false },
];

export default function Navbar() {
  const [notifCount, setNotifCount] = useState(3);

  const doubled = [...tickerItems, ...tickerItems];

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(7,8,12,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        height: '64px',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: '38px', gap: 12 }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 16 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'var(--violet)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 13, color: '#fff', flexShrink: 0,
          }}>Q</div>
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '-0.3px' }}>QuantMentor</span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 2, flex: 1 }}>
          {['Dashboard', 'Strategies', 'Live Trading', 'Journal', 'Analytics'].map((item, i) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: 'none',
                background: item === 'Dashboard' ? 'rgba(124,92,252,0.15)' : 'transparent',
                color: item === 'Dashboard' ? 'var(--violet)' : 'var(--text-secondary)',
                fontSize: 12, fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (item !== 'Dashboard') { e.target.style.color = 'var(--text-primary)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}}
              onMouseLeave={e => { if (item !== 'Dashboard') { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'transparent'; }}}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Market status */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '3px 10px', borderRadius: 20,
            background: 'var(--red-soft)',
            border: '1px solid rgba(255,77,106,0.2)',
          }}>
            <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', display: 'block' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--red)' }}>Bearish</span>
          </div>

          {/* Notif */}
          <button
            onClick={() => setNotifCount(0)}
            style={{
              position: 'relative', width: 30, height: 30, borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notifCount > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{
                  position: 'absolute', top: -3, right: -3,
                  width: 14, height: 14, borderRadius: '50%',
                  background: 'var(--violet)', color: '#fff',
                  fontSize: 9, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >{notifCount}</motion.span>
            )}
          </button>

          {/* Avatar */}
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(124,92,252,0.2)',
            border: '1px solid var(--violet-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#A78BFA',
          }}>AS</div>
        </div>
      </div>

      {/* Ticker row */}
      <div style={{
        height: 26, overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        background: 'rgba(255,255,255,0.015)',
      }}>
        <div style={{
          padding: '0 12px', fontSize: 10, fontWeight: 600,
          color: 'var(--text-muted)', borderRight: '1px solid var(--border)',
          height: '100%', display: 'flex', alignItems: 'center',
          flexShrink: 0, letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>Markets</div>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div className="ticker-track" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            {doubled.map((t, i) => (
              <div key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0 18px',
                borderRight: '1px solid var(--border)',
                fontSize: 11,
              }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{t.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{t.val}</span>
                <span style={{ fontWeight: 600, color: t.up ? 'var(--green)' : 'var(--red)' }}>
                  {t.up ? '▲' : '▼'} {t.chg}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}