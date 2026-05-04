import { useState } from 'react'

const fmtM = (n) => `$${(n / 1_000_000).toFixed(2)}M`

export default function RiskPanel({ event, onUpdate }) {
  const [choice, setChoice] = useState(null)
  const pick = (c) => { setChoice(c); onUpdate({ riskChoice: c }) }

  const impact     = event?.impact ?? {}
  const potentialLoss = Math.abs(impact.cashDelta ?? 0) + Math.abs(impact.valueDelta ?? 0)

  const Card = ({ id, icon, title, desc, row1, row2 }) => (
    <div onClick={() => pick(id)} className={`card choice-card${choice === id ? ' selected' : ''}`} style={{ flex: 1, padding: '1.25rem', cursor: 'pointer', border: choice === id ? '2px solid var(--blue)' : '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <span style={{ fontSize: '1.6rem' }}>{icon}</span>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</div>
      <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{row1.label}</span><span style={{ color: row1.colour, fontWeight: 600 }}>{row1.value}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{row2.label}</span><span style={{ color: row2.colour, fontWeight: 600 }}>{row2.value}</span></div>
      </div>
      <button className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.55rem 1rem', marginTop: 'auto', width: '100%' }} onClick={(e) => { e.stopPropagation(); pick(id) }}>Select</button>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {event && (
        <div className="card-dark" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-on-dark-muted)', marginBottom: 4 }}>Incoming Risk</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-on-dark)', marginBottom: 4 }}>{event.title}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-on-dark-muted)', lineHeight: 1.5 }}>{event.description}</div>
        </div>
      )}
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>How will you respond to this risk?</h3>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Card id="protect" icon="🛡️" title="Protect the company" desc="Pay $750,000 to absorb the full impact before it hits." row1={{ label: 'Upfront Cost', value: '$750,000', colour: 'var(--amber)' }} row2={{ label: 'Damage Avoided', value: fmtM(potentialLoss), colour: 'var(--green)' }} />
        <Card id="gamble"  icon="⚡" title="Take the risk"         desc="Keep the cash and face the full impact if it arrives." row1={{ label: 'Upfront Cost', value: '$0', colour: 'var(--green)' }} row2={{ label: 'Potential Loss', value: fmtM(potentialLoss), colour: 'var(--red)' }} />
      </div>
    </div>
  )
}
