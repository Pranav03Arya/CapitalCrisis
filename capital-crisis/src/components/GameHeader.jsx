import { motion, AnimatePresence } from 'framer-motion'

const fmt = (n) => '$' + Math.round(n).toLocaleString()

function Pill({ label, value, color }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ overflow: 'hidden', height: '1.2rem' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={value}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0,      opacity: 1 }}
            exit={{    y: '-100%', opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 600, color, lineHeight: '1.2rem' }}
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function GameHeader({ state }) {
  const { round, companyValue, cashOnHand, stakeholderConfidence, valueHistory } = state
  const trending = valueHistory.length < 2 || companyValue >= valueHistory[valueHistory.length - 2]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 64, zIndex: 100,
      background: 'var(--bg-base)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem',
    }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.12em', color: 'var(--accent-green)' }}>
        CAPITAL CRISIS
      </span>
      <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Round {round} of 6</span>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Pill label="Company Value" value={fmt(companyValue)} color={trending ? 'var(--accent-green)' : 'var(--accent-red)'} />
        <Pill label="Cash on Hand"  value={fmt(cashOnHand)}   color={cashOnHand < 30000 ? 'var(--accent-amber)' : 'var(--text-primary)'} />
        <Pill label="Confidence"    value={`${stakeholderConfidence}%`} color={stakeholderConfidence < 30 ? 'var(--accent-red)' : 'var(--text-primary)'} />
      </div>
    </header>
  )
}
