export default function SetupOptionRow({ items, selected, onSelect, layout = 'column', getKey, getLabel, getSub }) {
  const kFn   = getKey   ?? (item => item.id   ?? item.value)
  const sFn   = getSub   ?? (item => item.description ?? item.stage ?? '')
  const isRow = layout === 'row'

  return (
    <div style={{ display: 'flex', flexDirection: isRow ? 'row' : 'column', gap: 10, marginTop: '0.5rem', flexWrap: 'wrap' }}>
      {items.map(item => {
        const k     = kFn(item)
        const isSel = selected === k
        return (
          <div key={String(k)} className={`choice-card${isSel ? ' selected' : ''}`} onClick={() => onSelect(k)}
            style={isRow ? { flex: 1, minWidth: 80, textAlign: 'center', padding: '0.85rem 0.5rem' } : {}}>
            {isRow ? (
              <>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>{item.icon ?? item.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{sFn(item)}</p>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {item.icon && <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>}
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)', margin: 0 }}>{item.label}</p>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '0.3rem' }}>{sFn(item)}</p>
              </>
            )}
            {isSel && <span className="check-badge">✓</span>}
          </div>
        )
      })}
    </div>
  )
}
