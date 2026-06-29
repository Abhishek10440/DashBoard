// src/components/NavbarLanding.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function NavbarLanding() {
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 64,
        background: 'rgba(10,13,26,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: '#00d4aa',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0a0d1a', fontSize: 16, fontWeight: 700,
        }}>Q</div>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>QuantMentor</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Features</a>
        <a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Pricing</a>
        <a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Docs</a>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          style={{
            padding: '8px 20px',
            borderRadius: 8,
            background: '#00d4aa',
            border: 'none',
            color: '#0a0d1a',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Sign In
        </motion.button>
      </div>
    </motion.nav>
  );
}