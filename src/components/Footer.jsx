import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
      style={{
        marginTop: 8, paddingTop: 16,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)' }}>QuantMentor © {new Date().getFullYear()}</span>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)' }}>Research only — not investment advice</span>
    </motion.footer>
  )
}