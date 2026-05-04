import { motion } from 'framer-motion'

const FeatureCard = ({ title, body, badge }) => (
  <div className="card" style={{ padding: '1.25rem', position: 'relative' }}>
    <div style={{ width: 36, height: 36, background: 'var(--blue-light)', borderRadius: 8, marginBottom: '0.75rem' }} />
    {badge && <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: 4 }}>{badge}</div>}
    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{title}</div>
    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{body}</div>
  </div>
)

const Pill = ({ label }) => <span style={{ fontSize: '0.65rem', fontWeight: 700, background: 'var(--blue-light)', color: 'var(--blue)', padding: '0.2rem 0.5rem', borderRadius: 999 }}>{label}</span>

export default function LandingScreen({ onStart }) {
  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh', paddingTop: 80, paddingBottom: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 720, padding: '0 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.35rem 1rem', borderRadius: 999 }}>
          New Simulation Available
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.8rem,5vw,4rem)', lineHeight: 1.1, textAlign: 'center', margin: 0 }}>
          <span style={{ color: 'var(--text-primary)' }}>Capital Crisis:</span><br />
          <span style={{ color: 'var(--blue)' }}>The Chief Financial Officer Challenge</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18, duration: 0.4 }} style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, textAlign: 'center', maxWidth: 520 }}>
          6 Rounds. 3 Decisions. 1 Goal: Take your company public — or face <span style={{ color: 'var(--red)', fontWeight: 600 }}>bankruptcy</span>. Your legacy starts in the boardroom.
        </motion.p>
        <motion.button className="btn-primary" onClick={onStart} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.24, duration: 0.35 }}
          style={{ width: 320, height: 56, fontSize: '1.05rem', marginTop: '0.75rem' }}>
          Start Simulation →
        </motion.button>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Multiplayer Mode', 'Certified Analyst'].map(t => (
            <span key={t} style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', cursor: 'pointer' }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%', marginTop: '0.5rem' }}>
          <FeatureCard title="Live Metric Tracking" body="Watch your company value, cash reserves, and stakeholder confidence update in real time after every decision you make." />
          <FeatureCard title="6 Strategic Rounds" body="Each round teaches one core finance concept through a real scenario you must navigate as CFO." badge={['R1','R2','R3'].map(r => <Pill key={r} label={r} />)} />
        </div>
        <div className="card-dark" style={{ width: '100%', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.12)', borderRadius: 10, flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-on-dark)', marginBottom: '0.35rem' }}>Market Risk Engine</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-on-dark-muted)', lineHeight: 1.6 }}>Every round surfaces a live market event — a rate spike, a lost client, a supply shock. Decide whether to pay for protection or take the hit.</div>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Capital Crisis</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>{['About','How to Play','License'].map(l => <span key={l} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>{l}</span>)}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>© 2025</span>
        </div>
      </div>
    </div>
  )
}
