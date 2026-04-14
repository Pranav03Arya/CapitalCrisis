import { motion } from 'framer-motion'
import { ROUND_DESCRIPTIONS } from '../utils/roundDescriptions.js'
import RoundTracker from '../components/layout/RoundTracker.jsx'
import MetricCard from '../components/MetricCard.jsx'

const fmtM = (n) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${(n / 1_000).toFixed(0)}K`

function StyledHeading({ text }) {
  const parts = text.split(/(__[^_]+__)/)
  return (
    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.2rem', color: 'var(--text-primary)', lineHeight: 1.2, margin: 0 }}>
      {parts.map((p, i) => p.startsWith('__')
        ? <span key={i} style={{ color: 'var(--blue)', fontStyle: 'italic' }}>{p.replace(/__/g, '')}</span>
        : <span key={i}>{p}</span>
      )}
    </h2>
  )
}

export default function BriefingScreen({ state, nextPhase }) {
  const { round, companyValue, cashOnHand, stakeholderConfidence, totalDebt, valueHistory } = state
  const desc    = ROUND_DESCRIPTIONS[round - 1]
  const prevVal = valueHistory.length > 1 ? valueHistory[valueHistory.length - 2] : companyValue
  const trending = companyValue >= prevVal

  const cards = [
    { label: 'Company Value',          formattedValue: fmtM(companyValue),            accentColour: 'var(--blue)',           subLabel: trending ? '↑ Trending up' : '↓ Trending down' },
    { label: 'Cash on Hand',           formattedValue: fmtM(cashOnHand),              accentColour: cashOnHand < 500_000 ? 'var(--red)' : 'var(--green)', subLabel: cashOnHand < 500_000 ? 'Low — act carefully' : 'Healthy' },
    { label: 'Stakeholder Confidence', formattedValue: `${stakeholderConfidence}%`,   accentColour: stakeholderConfidence < 30 ? 'var(--red)' : 'var(--text-primary)', subLabel: stakeholderConfidence >= 60 ? 'Positive' : stakeholderConfidence >= 30 ? 'Neutral' : 'Critical' },
    { label: 'Total Debt',             formattedValue: fmtM(totalDebt),               accentColour: totalDebt > 8_000_000 ? 'var(--red)' : 'var(--text-primary)', subLabel: totalDebt === 0 ? 'Debt free' : 'Outstanding' },
  ]

  return (
    <div style={{ maxWidth: 860, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <RoundTracker round={round} />
      <StyledHeading text={desc.scenarioHeading} />
      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 600, margin: 0 }}>{desc.scenarioBody}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.32 }}>
            <MetricCard {...c} />
          </motion.div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <button className="btn-primary" onClick={nextPhase}>See What Needs Deciding →</button>
      </div>
    </div>
  )
}
