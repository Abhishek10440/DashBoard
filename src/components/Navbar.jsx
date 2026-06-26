// src/components/Navbar.jsx
import { motion } from 'framer-motion';
import { RiBellLine } from 'react-icons/ri';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';   // <-- import

const TICKS = [
  { s: 'NSEI',      v: '23,824',  c: '-1.09%', up: false },
  { s: 'BANKNIFTY', v: '57,183',  c: '-0.70%', up: false },
  { s: 'SENSEX',    v: '76,200',  c: '-1.24%', up: false },
  { s: 'BTC',       v: '$62,357', c: '-1.86%', up: false },
  { s: 'ETH',       v: '$1,658',  c: '-3.10%', up: false },
  { s: 'GOLD',      v: '$2,341',  c: '+0.32%', up: true  },
  { s: 'USD/INR',   v: '83.42',   c: '+0.08%', up: true  },
];

export default function Navbar() {
  const [notif, setNotif] = useState(3);
  const doubled = [...TICKS, ...TICKS];
  const navigate = useNavigate();
  const { user, logout } = useUser();   // <-- get user and logout

  const handleLogout = () => {
    logout();          // clear context & localStorage
    navigate('/login');
  };

  // Get initials from name
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
        background: 'rgba(10,11,16,0.98)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Main row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', height: 36, flex: 1 }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8, flexShrink: 0 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7,
            background: '#00d4aa',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 12, fontWeight: 700,
          }}>Q</div>
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '-0.3px', color: '#f0f0f5' }}>QuantMentor</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setNotif(0)}
            style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
              position: 'relative',
            }}
          >
            <RiBellLine size={14} />
            {notif > 0 && (
              <span style={{
                position: 'absolute', top: -3, right: -3,
                width: 14, height: 14, borderRadius: '50%',
                background: '#00d4aa', color: '#fff',
                fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{notif}</span>
            )}
          </button>

          {/* Avatar — dynamic initials */}
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(124,58,237,0.2)',
            border: '1px solid rgba(124,58,237,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#c4b5fd',
          }}>
            {initials}
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '11px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              e.target.style.color = '#f87171';
              e.target.style.borderColor = 'rgba(248,113,113,0.3)';
            }}
            onMouseLeave={e => {
              e.target.style.color = 'rgba(255,255,255,0.3)';
              e.target.style.borderColor = 'rgba(255,255,255,0.06)';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Ticker row */}
      <div style={{
        height: 20, overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.015)',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          padding: '0 12px', fontSize: 10, fontWeight: 600,
          color: 'rgba(255,255,255,0.2)', letterSpacing: '0.06em',
          textTransform: 'uppercase', borderRight: '1px solid rgba(255,255,255,0.06)',
          height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0,
        }}>Live</div>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div className="ticker" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            {doubled.map((t, i) => (
              <div key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '0 16px', borderRight: '1px solid rgba(255,255,255,0.05)',
                fontSize: 11,
              }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{t.s}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t.v}</span>
                <span style={{ fontWeight: 600, color: t.up ? '#34d399' : '#f87171' }}>
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