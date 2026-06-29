
import { motion } from 'framer-motion';
import { RiBellLine } from 'react-icons/ri';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const TICKS = [
  { s: 'NSEI',      v: '23,945',  c: '+0.51%', up: true },
  { s: 'NSEBANK',   v: '57,675',  c: '+0.86%', up: false },
  { s: 'BSESN',     v: '76,688',  c: '+0.64%', up: true },
  { s: 'BTC',       v: '$60,021', c: '+0.50%', up: true },
  { s: 'ETH',       v: '$1,577',  c: '+0.80%', up: false },
  { s: 'GOLD',      v: '$2,341',  c: '+0.32%', up: true },
  { s: 'USD/INR',   v: '83.42',   c: '+0.08%', up: false},
];

export default function Navbar() {
  const [notif, setNotif] = useState(3);
  const doubled = [...TICKS, ...TICKS];
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const initials = getInitials(user.name);

  return (
    <motion.nav
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 56,
        background: 'rgba(10,14,26,0.98)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', height: 36, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8, flexShrink: 0 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 12, fontWeight: 700,
          }}>Q</div>
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>QuantMentor</span>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setNotif(0)}
            style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-dim)', cursor: 'pointer',
              position: 'relative',
            }}
          >
            <RiBellLine size={14} />
            {notif > 0 && (
              <span style={{
                position: 'absolute', top: -3, right: -3,
                width: 14, height: 14, borderRadius: '50%',
                background: 'var(--accent)',
                color: '#fff',
                fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{notif}</span>
            )}
          </button>

          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'var(--indigo-soft)',
            border: '1px solid var(--indigo-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#A5B4FC',
          }}>
            {initials}
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-dim)',
              fontSize: 11,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.target.style.color = 'var(--red)';
              e.target.style.borderColor = 'var(--red-soft)';
            }}
            onMouseLeave={e => {
              e.target.style.color = 'var(--text-dim)';
              e.target.style.borderColor = 'var(--border)';
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div style={{
        height: 20, overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        background: 'rgba(255,255,255,0.015)',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          padding: '0 12px', fontSize: 10, fontWeight: 600,
          color: 'var(--text-dim)', letterSpacing: '0.06em',
          textTransform: 'uppercase',
          borderRight: '1px solid var(--border)',
          height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0,
        }}>Live</div>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div className="ticker" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            {doubled.map((t, i) => (
              <div key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0 16px',
                borderRight: '1px solid var(--border)',
                fontSize: 11,
              }}>
                <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>{t.s}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{t.v}</span>
                <span style={{ fontWeight: 600, color: t.up ? 'var(--green)' : 'var(--red)' }}>
                  {t.up ? '▲' : '▼'} {t.c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}