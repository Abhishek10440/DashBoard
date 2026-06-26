// src/pages/Login.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      login(name || 'Guest'); // if name empty, use Guest
      setIsLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0d1a',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '-20%', right: '-10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%', left: '-10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '400px',
          background: '#111827',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          padding: '40px 32px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          <div style={{
            width: '40px', height: '40px',
            borderRadius: '10px',
            background: '#00d4aa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 700,
            color: '#fff',
          }}>Q</div>
          <span style={{
            fontSize: '22px',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            color: '#f0f0f5',
          }}>QuantMentor</span>
        </motion.div>

        <h2 style={{
          fontSize: '24px',
          fontWeight: 600,
          marginBottom: '6px',
          textAlign: 'center',
          color: '#f0f0f5',
        }}>Welcome</h2>
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '13px',
          marginBottom: '28px',
        }}>
          Sign in to access your command center
        </p>

        <form onSubmit={handleSubmit}>
          {/* NEW: Name field */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 500,
              color: '#9ca3af',
              marginBottom: '5px',
            }}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.03)',
                color: '#f0f0f5',
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,212,170,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 500,
              color: '#9ca3af',
              marginBottom: '5px',
            }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.03)',
                color: '#f0f0f5',
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,212,170,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 500,
                color: '#9ca3af',
              }}>Password</label>
              <a href="#" style={{
                fontSize: '12px',
                color: '#00d4aa',
                textDecoration: 'none',
              }}>Forgot password?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.03)',
                color: '#f0f0f5',
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,212,170,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#00d4aa',
              color: '#0a0d1a',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In →'}
          </motion.button>
        </form>

        <p style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#6b7280',
        }}>
          Don't have an account? <a href="#" style={{ color: '#00d4aa', textDecoration: 'none', fontWeight: 500 }}>Sign up</a>
        </p>
      </motion.div>
    </div>
  );
}