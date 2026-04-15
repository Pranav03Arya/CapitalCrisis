import { useEffect } from 'react'
import { ROUND_DESCRIPTIONS } from '../utils/roundDescriptions.js'
import { useClaudeDebrief } from '../hooks/useClaudeDebrief.js'

export default function LearnScreen({ state, nextPhase, setDebrief }) {
  const desc = ROUND_DESCRIPTIONS[state.round - 1]
  const { loading } = useClaudeDebrief(state, setDebrief)

  useEffect(() => {
    if (!loading) nextPhase()
  }, [loading]) // eslint-disable-line

  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <span className="tag tag-blue">{desc.conceptName}</span>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--text-primary)', margin: 0 }}>
        {desc.conceptName}
      </h2>
      <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>{desc.conceptDefinition}</p>
      <div style={{ padding: '1.25rem', borderLeft: '3px solid var(--blue)', background: 'var(--blue-light)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--blue)', marginBottom: 6 }}>Analyst's Insight</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>"{desc.analystQuote}"</p>
      </div>
      <div className="card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--blue)', borderTopColor: 'transparent', animation: loading ? 'spin 0.8s linear infinite' : 'none', flexShrink: 0 }} />
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {loading ? 'Generating your personalised round analysis…' : 'Analysis ready — advancing to next round.'}
        </span>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
