import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }) {
  const [display, setDisplay] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    const target = parseFloat(String(value).replace(/,/g, ''))
    const duration = 1200
    const start = performance.now()

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setDisplay(target * ease)
      if (progress < 1) raf.current = requestAnimationFrame(step)
    }

    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [value])

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString()

  return <>{prefix}{formatted}{suffix}</>
}

export default function StatCard({
  icon: Icon, label, value,
  prefix = '', suffix = '', decimals = 0,
  change, changeUp, accent = 'violet', index = 0
}) {
  const colors = {
    violet: { ring: 'border-violet-500/20', icon: 'bg-violet-600/15 text-violet-400' },
    green:  { ring: 'border-emerald-500/20', icon: 'bg-emerald-500/10 text-emerald-400' },
    gold:   { ring: 'border-amber-500/20',   icon: 'bg-amber-500/10 text-amber-400' },
    red:    { ring: 'border-red-500/20',      icon: 'bg-red-500/10 text-red-400' },
  }
  const c = colors[accent] || colors.violet

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className={`bg-[#13141a] border ${c.ring} rounded-xl p-4 cursor-default`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}>
          {Icon && <Icon size={16} />}
        </div>
        {change && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
            changeUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {changeUp ? '▲' : '▼'} {change}
          </span>
        )}
      </div>

      <p className="text-[11px] font-medium text-white/30 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold tracking-tight text-white">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
    </motion.div>
  )
}