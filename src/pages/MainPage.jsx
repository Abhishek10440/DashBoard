// src/pages/MainPage.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiArrowRightLine, RiRobot2Line, RiLineChartLine,
  RiBarChart2Line, RiShieldCheckLine, RiFlashlightLine,
  RiBrainLine, RiDatabase2Line, RiMoneyDollarCircleLine,
  RiCodeBoxLine, RiPieChartLine, RiStarLine,
  RiTwitterXLine, RiLinkedinBoxLine, RiGithubLine,
} from 'react-icons/ri';
import { FaYoutube, FaDiscord } from 'react-icons/fa';

// ── Typewriter effect ──
function Typewriter({ words, speed = 100, delay = 2000 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), delay);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timer = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [subIndex, index, reverse, words, speed, delay]);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span style={{ opacity: blink ? 1 : 0, color: '#00d4aa' }}>|</span>
    </span>
  );
}

// ── Counter animation ──
function Counter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const animate = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ── Feature card ──
function FeatureCard({ icon: Icon, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.15 } }}
      style={{
        padding: '28px 24px',
        borderRadius: 16,
        background: '#0f1525',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,212,170,0.3)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,212,170,0.06)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: 'rgba(0,212,170,0.1)',
        border: '1px solid rgba(0,212,170,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 16,
        fontSize: 22,
        color: '#00d4aa',
      }}>
        <Icon size={22} />
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 600, color: '#f0f0f5', marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{desc}</p>
    </motion.div>
  );
}

// ── Step card ──
function StepCard({ number, title, desc, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      style={{
        display: 'flex', gap: 16,
        alignItems: 'flex-start',
        padding: '20px 24px',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: 'rgba(0,212,170,0.12)',
        border: '1px solid rgba(0,212,170,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 700, color: '#00d4aa',
        flexShrink: 0,
      }}>{number}</div>
      <div>
        <h4 style={{ fontSize: 15, fontWeight: 600, color: '#f0f0f5', marginBottom: 4 }}>{title}</h4>
        <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </motion.div>
  );
}

// ── Main Component ──
export default function MainPage() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <div style={{ background: '#0a0d1a', minHeight: '100vh', overflow: 'hidden' }}>

      {/* ─── HERO SECTION ─── */}
      <motion.section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background gradient orbs */}
        <div style={{
          position: 'absolute',
          top: '-30%', right: '-10%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%', left: '-10%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, width: '100%', position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px 6px 10px',
              borderRadius: 50,
              background: 'rgba(0,212,170,0.08)',
              border: '1px solid rgba(0,212,170,0.15)',
              marginBottom: 24,
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#00d4aa',
              display: 'block',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
              🚀 AI-Powered Trading Automation
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontSize: 'clamp(42px, 6vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#fff',
              letterSpacing: '-0.04em',
              marginBottom: 20,
              maxWidth: 700,
            }}
          >
            Trade Smarter with{' '}
            <span style={{ color: '#00d4aa' }}>
              <Typewriter
                words={['AI', 'Automation', 'Precision', 'Confidence']}
                speed={80}
                delay={1500}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{
              fontSize: 'clamp(16px, 1.2vw, 20px)',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 560,
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            Build, backtest, and automate your trading strategies with AI.
            From idea to execution in minutes — no coding required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,212,170,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              style={{
                padding: '14px 32px',
                borderRadius: 10,
                background: '#00d4aa',
                border: 'none',
                color: '#0a0d1a',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Start Building <RiArrowRightLine size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 32px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <RiRobot2Line size={18} /> Explore AI
            </motion.button>
          </motion.div>

          {/* Stats banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            style={{
              marginTop: 48,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 24,
              paddingTop: 32,
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {[
              { label: 'Backtested Strategies', target: 500, suffix: '+' },
              { label: 'Trades Executed', target: 100000, suffix: '+' },
              { label: 'Active Users', target: 12000, suffix: '+' },
              { label: 'Success Rate', target: 78, suffix: '%' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize: 'clamp(24px, 2.5vw, 32px)',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'monospace',
                }}>
                  <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── FEATURES SECTION ─── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <p style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#00d4aa',
            marginBottom: 8,
          }}>Features</p>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 12,
          }}>
            Everything You Need to Trade Smarter
          </h2>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.4)',
            maxWidth: 500,
            margin: '0 auto',
          }}>
            AI-powered tools designed to give you an edge in the markets.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {[
            { icon: RiBrainLine, title: 'AI Strategy Builder', desc: 'Describe your strategy in plain English — AI generates the code automatically.' },
            { icon: RiLineChartLine, title: 'Live AI Assistant', desc: 'Get real-time trade setups, pattern recognition, and market insights.' },
            { icon: RiBarChart2Line, title: 'Backtest & Analytics', desc: 'Test your strategies on years of historical data with detailed metrics.' },
            { icon: RiRobot2Line, title: 'Automated Execution', desc: 'Connect your broker and let AI execute trades 24/7.' },
            { icon: RiShieldCheckLine, title: 'Risk Management', desc: 'Daily loss caps, position limits, and drawdown protection.' },
            { icon: RiMoneyDollarCircleLine, title: 'Paper Trading', desc: 'Practice with $10k virtual capital before going live.' },
          ].map((feature, i) => (
            <FeatureCard key={i} {...feature} delay={0.1 + i * 0.06} />
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#00d4aa',
            marginBottom: 8,
          }}>How It Works</p>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 700,
            color: '#fff',
          }}>
            From Idea to Execution in 4 Steps
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
        }}>
          {[
            { number: '01', title: 'Describe Your Strategy', desc: 'Tell AI your trading rules in plain English — no coding needed.' },
            { number: '02', title: 'Build & Review', desc: 'AI converts your idea into code. Review and refine the strategy.' },
            { number: '03', title: 'Backtest', desc: 'Test against historical data. See win rate, drawdown, Sharpe ratio.' },
            { number: '04', title: 'Connect & Go Live', desc: 'Link your broker and let AI execute trades automatically.' },
          ].map((step, i) => (
            <StepCard key={i} {...step} delay={0.1 + i * 0.08} />
          ))}
        </div>
      </section>

      {/* ─── AI SUMMARY / LIVE DEMO ─── */}
      <section style={{ padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,170,0.06) 0%, #0f1525 50%, rgba(124,58,237,0.04) 100%)',
            border: '1px solid rgba(0,212,170,0.1)',
            borderRadius: 16,
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'rgba(0,212,170,0.12)',
              border: '1px solid rgba(0,212,170,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28,
              marginBottom: 20,
            }}
          >
            <RiFlashlightLine style={{ color: '#00d4aa' }} size={28} />
          </motion.div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            Ready to Start Trading Smarter?
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 480, lineHeight: 1.6, marginBottom: 24 }}>
            Join thousands of traders using AI to automate their strategies.
            Start with paper trading — no risk, no commitment.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,212,170,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            style={{
              padding: '14px 40px',
              borderRadius: 10,
              background: '#00d4aa',
              border: 'none',
              color: '#0a0d1a',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Get Started Free <RiArrowRightLine size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '40px 24px',
        maxWidth: 1100,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 24,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: '#8d70d8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#0a0d1a', fontSize: 16, fontWeight: 700,
              }}>Q</div>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>QuantMentor</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', maxWidth: 280, lineHeight: 1.6 }}>
              AI-powered trading automation for retail traders.
              Built by traders, for traders.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {[
              { title: 'Product', items: ['Features', 'Pricing', 'Docs', 'API'] },
              { title: 'Company', items: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', items: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((group) => (
              <div key={group.title}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {group.title}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {group.items.map((item) => (
                    <a key={item} href="#" style={{
                      fontSize: 12, color: 'rgba(255,255,255,0.3)',
                      textDecoration: 'none', transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#fff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
                    >{item}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)' }}>
            © {new Date().getFullYear()} Abhishek Gupta. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { icon: RiTwitterXLine, href: '#' },
              { icon: RiLinkedinBoxLine, href: '#' },
              { icon: FaYoutube, href: '#' },
              { icon: FaDiscord, href: '#' },
              { icon: RiGithubLine, href: '#' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                whileHover={{ y: -2, color: '#231570' }}
                style={{
                  color: 'rgba(255,255,255,0.15)',
                  fontSize: 18,
                  transition: 'color 0.15s',
                }}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>

      {/* ─── CSS Animations ─── */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}