import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  RiDashboardLine, RiLineChartLine, RiRobot2Line,
  RiBarChartGroupedLine, RiBookLine, RiPulseLine,
  RiSettings3Line, RiPlugLine, RiStockLine,
  RiCpuLine, RiLogoutBoxLine,
} from 'react-icons/ri'

const NAV = [
  { icon: RiDashboardLine,       label: 'Dashboard' },
  { icon: RiStockLine,           label: 'Market Analysis' },
  { icon: RiLineChartLine,       label: 'Chart Analysis' },
  { icon: RiPulseLine,           label: 'Live AI Assistant' },
  { icon: RiCpuLine,             label: 'AI Strategies' },
  { icon: RiRobot2Line,          label: 'Live Trading' },
  { icon: RiBookLine,            label: 'Trade Journal' },
  { icon: RiBarChartGroupedLine, label: 'Analytics' },
  { icon: RiSettings3Line,       label: 'Settings' },
]

export default function Sidebar() {
  const [active, setActive] = useState('Dashboard')

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: 220,
        background: '#0c1020',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        padding: '20px 10px',
        zIndex: 40,
      }}
    >
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'4px 10px', marginBottom:24 }}>
        <div style={{
          width:32, height:32, borderRadius:8,
          background:'linear-gradient(135deg, #00d4aa, #0099cc)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:16,
        }}>📈</div>
        <span style={{ fontSize:15, fontWeight:700, color:'#fff', letterSpacing:'-0.3px' }}>QuantMentor</span>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {NAV.map((item, i) => {
          const isActive = active === item.label
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.04 }}
              onClick={() => setActive(item.label)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8,
                // ✅ cyan instead of violet
                background: isActive ? 'rgba(0,212,170,0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(0,212,170,0.25)' : '1px solid transparent',
                color: isActive ? '#00d4aa' : 'rgba(255,255,255,0.4)',
                fontSize: 13, fontWeight: isActive ? 500 : 400,
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)' }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}}
            >
              {/* ✅ icon cyan when active */}
              <item.icon size={15} style={{ flexShrink: 0, color: isActive ? '#00d4aa' : 'rgba(255,255,255,0.3)' }} />
              <span style={{ flex: 1 }}>{item.label}</span>
            </motion.button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[{ icon: RiPlugLine, label: 'Connect Broker' }, { icon: RiLogoutBoxLine, label: 'Sign Out' }].map(({ icon: Icon, label }) => (
          <button key={label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', borderRadius: 8,
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.28)', fontSize: 13, cursor: 'pointer',
            transition: 'all 0.15s', textAlign: 'left', width: '100%',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.28)'; e.currentTarget.style.background = 'transparent' }}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>
    </motion.aside>
  )
}