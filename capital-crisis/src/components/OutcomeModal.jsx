import ValueChart from './ValueChart.jsx'

const arrow = (a, b) => b > a ? '↑' : b < a ? '↓' : '—'
const arrowColor = (a, b) => b > a ? 'var(--accent-green)' : b < a ? 'var(--accent-red)' : 'var(--text-muted)'
const fmtK = (v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(2)}M` : `${(v / 1000).toFixed(0)}K`

export default function OutcomeModal({ state, onClose }) {
  const { valueHistory } = state

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(7,8,15,0.85)', backdropFilter: 'blur(6px)',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '1.5rem',
        width: '90%', maxWidth: 680, position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'none',
          border: 'none', color: 'var(--text-muted)', fontSize: '1.25rem', cursor: 'pointer', lineHeight: 1,
        }}>✕</button>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          Your company value across all 6 rounds
        </div>
        <ValueChart state={state} height={360} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '0.5rem' }}>
          {valueHistory.map((v, i) => (
            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>R{i + 1}</div>
              <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>${fmtK(v)}</div>
              {i > 0 && (
                <div style={{ fontSize: '0.7rem', color: arrowColor(valueHistory[i - 1], v) }}>
                  {arrow(valueHistory[i - 1], v)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
