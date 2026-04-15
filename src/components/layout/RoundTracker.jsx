export default function RoundTracker({ round }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {Array.from({ length: 6 }, (_, i) => {
        const n       = i + 1
        const done    = n < round
        const current = n === round

        const circle = {
          width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
          background:  done    ? 'var(--blue)'  : current ? '#fff'                : 'transparent',
          border:      done    ? 'none'          : current ? '2px solid var(--blue)' : '2px solid var(--border-strong)',
          color:       done    ? '#fff'          : current ? 'var(--blue)'           : 'var(--text-muted)',
          boxShadow:   current ? '0 0 0 4px var(--blue-light)' : 'none',
          transition:  'var(--transition)',
        }

        const line = {
          flex: 1, height: 2, minWidth: 16,
          background: done ? 'var(--blue)' : 'var(--border)',
          transition: 'var(--transition)',
        }

        return (
          <div key={n} style={{ display: 'flex', alignItems: 'center', flex: n < 6 ? 1 : 'none' }}>
            <div style={circle}>{n}</div>
            {n < 6 && <div style={line} />}
          </div>
        )
      })}
    </div>
  )
}
