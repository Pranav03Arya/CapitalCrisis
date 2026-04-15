export default function MetricCard({ label, formattedValue, subLabel, accentColour = 'var(--text-primary)', icon }) {
  const isBlue     = accentColour === 'var(--blue)'
  const borderLeft = isBlue ? '3px solid var(--blue)' : '3px solid transparent'

  return (
    <div className="card" style={{ padding: '1rem 1.25rem', borderLeft }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.4rem' }}>
        {icon && <span style={{ color: 'var(--text-muted)', lineHeight: 0, fontSize: 16 }}>{icon}</span>}
        <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
          {label}
        </span>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', color: accentColour, lineHeight: 1.1 }}>
        {formattedValue}
      </div>
      {subLabel && (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{subLabel}</div>
      )}
    </div>
  )
}
