import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const DATA = [
  { m: 'Jan', pnl: 1200 }, { m: 'Feb', pnl: -400 }, { m: 'Mar', pnl: 2100 },
  { m: 'Apr', pnl: 1800 }, { m: 'May', pnl: 3200 }, { m: 'Jun', pnl: 2700 },
  { m: 'Jul', pnl: -600 }, { m: 'Aug', pnl: 4100 }, { m: 'Sep', pnl: 3500 },
  { m: 'Oct', pnl: 5200 }, { m: 'Nov', pnl: 4800 }, { m: 'Dec', pnl: 6100 },
]

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const v = payload[0].value
  return (
    <div style={{
      background: '#16171e', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 8, padding: '8px 12px', fontSize: 12,
    }}>
      <p style={{ color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>{label}</p>
      <p style={{ fontWeight: 700, color: v >= 0 ? '#34d399' : '#f87171' }}>
        {v >= 0 ? '+' : ''}${v.toLocaleString()}
      </p>
    </div>
  )
}

export default function ChartSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      style={{
        background: '#13141b',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12, padding: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f0f0f5', marginBottom: 2 }}>Monthly P&L</h3>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>12-month performance</p>
        </div>
        <span style={{
          fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 8,
          background: 'rgba(52,211,153,0.1)', color: '#34d399',
          border: '1px solid rgba(52,211,153,0.2)',
        }}>+$6,100 total</span>
      </div>

      <ResponsiveContainer width="100%" height={190}>
        <AreaChart data={DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="m" tick={{ fill: '#3a3b48', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#3a3b48', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
          <Tooltip content={<Tip />} />
          <Area type="monotone" dataKey="pnl" stroke="#7c3aed" strokeWidth={2}
            fill="url(#pnlGrad)" dot={false} activeDot={{ r: 4, fill: '#7c3aed', strokeWidth: 0 }} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}