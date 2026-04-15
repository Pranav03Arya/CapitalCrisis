import { CAPITAL_STRUCTURES } from '../engine/setupConfig.js'
import { formatMillions } from '../utils/formatters.js'

export default function SetupCapitalGrid({ selected, onSelect }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: '0.5rem' }}>
      {CAPITAL_STRUCTURES.map(c => (
        <div key={c.id} className={`choice-card${selected === c.id ? ' selected' : ''}`} onClick={() => onSelect(c.id)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', margin: 0 }}>{c.label}</p>
            <span className={`tag ${c.tagColour}`}>{c.tagLabel}</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '0.35rem' }}>{c.description}</p>
          <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <div>Cash: {formatMillions(c.statOverrides.cashOnHand)}</div>
            <div>Debt: {c.statOverrides.totalDebt > 0 ? formatMillions(c.statOverrides.totalDebt) : 'None'}</div>
            <div>Equity kept: {c.statOverrides.equityRetained}%</div>
          </div>
          {selected === c.id && <span className="check-badge">✓</span>}
        </div>
      ))}
    </div>
  )
}
