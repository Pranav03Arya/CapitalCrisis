import { SECTORS } from '../engine/setupConfig.js'

export default function SetupSectorGrid({ selected, onSelect }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: 10, marginTop: '0.5rem' }}>
      {SECTORS.map(s => (
        <div key={s.id} className={`choice-card${selected === s.id ? ' selected' : ''}`} onClick={() => onSelect(s.id)}>
          <span style={{ fontSize: '1.5rem' }}>{s.emoji}</span>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', marginTop: '0.4rem' }}>{s.label}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '0.3rem' }}>{s.description}</p>
          {selected === s.id && <span className="check-badge">✓</span>}
        </div>
      ))}
    </div>
  )
}
