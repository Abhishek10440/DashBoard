import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  RiDashboardLine, RiLineChartLine, RiRobot2Line,
  RiBarChartGroupedLine, RiBookLine, RiPulseLine,
  RiSettings3Line, RiPlugLine,
} from 'react-icons/ri'

const NAV = [
  { icon: RiDashboardLine,       label: 'Dashboard',    },
  { icon: RiPulseLine,           label: 'Market Pulse', },
  { icon: RiLineChartLine,       label: 'Chart AI',     badge: 'AI' },
  { icon: RiRobot2Line,          label: 'Strategies',   },
  { icon: RiBarChartGroupedLine, label: 'Analytics',    },
  { icon: RiBookLine,            label: 'Journal',      },
]

export default function Sidebar() {
  const [active, setActive] = useState('Dashboard')

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        position: 'fixed', left: 0, top: 56, bottom: 0, width: 208,
        background: '#0e0f15',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        padding: '12px 8px',
        zIndex: 40,
      }}
    >
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
                padding: '8px 12px', borderRadius: 8,
                background: isActive ? 'rgba(124,58,237,0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
                color: isActive ? '#c4b5fd' : 'rgba(255,255,255,0.35)',
                fontSize: 13, fontWeight: isActive ? 500 : 400,
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}}
            >
              <item.icon size={15} style={{ flexShrink: 0, color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.25)' }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 4,
                  background: 'rgba(124,58,237,0.2)', color: '#a78bfa',
                  border: '1px solid rgba(124,58,237,0.3)',
                }}>{item.badge}</span>
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {[{ icon: RiPlugLine, label: 'Connect Broker' }, { icon: RiSettings3Line, label: 'Settings' }].map(({ icon: Icon, label }) => (
          <button key={label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '7px 12px', borderRadius: 8,
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.25)', fontSize: 13, cursor: 'pointer',
            transition: 'all 0.15s', textAlign: 'left', width: '100%',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'transparent' }}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>
    </motion.aside>
  )
}