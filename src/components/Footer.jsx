import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      style={{
        marginTop: 32,
        paddingTop: 16,
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 5,
          background: 'var(--violet)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700, color: '#fff',
        }}>Q</div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          QuantMentor © {new Date().getFullYear()}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {['Docs', 'API', 'Status', 'Privacy'].map(item => (
          <a key={item} href="#" style={{
            fontSize: 11, color: 'var(--text-muted)',
            textDecoration: 'none', transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >{item}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span className="pulse-dot" style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--green)', display: 'block',
        }} />
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          Research only — not investment advice.
        </span>
      </div>
    </motion.footer>
  );
}