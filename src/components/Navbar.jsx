import { motion } from 'framer-motion'
import { RiBellLine } from 'react-icons/ri'
import { useState } from 'react'

const TICKS = [
  { s: 'NSEI',      v: '23,824',  c: '-1.09%', up: false },
  { s: 'BANKNIFTY', v: '57,183',  c: '-0.70%', up: false },
  { s: 'SENSEX',    v: '76,200',  c: '-1.24%', up: false },
  { s: 'BTC',       v: '$62,357', c: '-1.86%', up: false },
  { s: 'ETH',       v: '$1,658',  c: '-3.10%', up: false },
  { s: 'GOLD',      v: '$2,341',  c: '+0.32%', up: true  },
  { s: 'USD/INR',   v: '83.42',   c: '+0.08%', up: true  },
]

export default function Navbar() {
  const [notif, setNotif] = useState(3)
  const doubled = [...TICKS, ...TICKS]

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
            background: '#7c3aed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 12, fontWeight: 700,
          }}>Q</div>
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '-0.3px', color: '#f0f0f5' }}>QuantMentor</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '3px 10px', borderRadius: 20,
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#f87171', display: 'block',
              animation: 'blink 1.8s ease-in-out infinite',
            }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#f87171' }}>Bearish</span>
          </div>

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
                background: '#7c3aed', color: '#fff',
                fontSize: 9, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{notif}</span>
            )}
          </button>

          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(124,58,237,0.2)',
            border: '1px solid rgba(124,58,237,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#c4b5fd',
          }}>AS</div>
        </div>
      </div>

      {/* Ticker */}
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
  )
}