import { useEffect, useRef, useState } from 'react'
import { useClaudeDebrief } from '../hooks/useClaudeDebrief.js'
import LoadingShimmer from '../components/LoadingShimmer'

const fmtM = (n) => `$${(n / 1_000_000).toFixed(2)}M`
const TAG  = { red: 'tag-red', amber: 'tag-amber', green: 'tag-green' }
const CHART_PTS = '0,50 18,44 36,36 50,16 65,26 82,20 98,28 114,22 140,18 160,14'

export default function EventScreen({ state, nextPhase, applyEventResult, applyFinancialResults, setDebrief }) {
  const fired = useRef(false)
  const { currentEvent, debriefText, round } = state

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    applyEventResult()
    applyFinancialResults()
  }, []) // eslint-disable-line

  const { loading: analysisLoading } = useClaudeDebrief(state, setDebrief)

  const [analysisVisible, setAnalysisVisible] = useState(false)
  useEffect(() => {
    if (debriefText) {
      const t = setTimeout(() => setAnalysisVisible(true), 50)
      return () => clearTimeout(t)
    }
  }, [debriefText])

  const tagClass  = TAG[currentEvent?.tagColour] ?? 'tag-blue'
  const isPositive = currentEvent?.type === 'positive'

  return (
    <div style={{ maxWidth: 860, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card-dark" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start', borderRadius: 'var(--radius-lg)', ...(isPositive && { background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)' }) }}>
        <div style={{ flex: 1 }}>
          <span className={`tag ${tagClass}`} style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>{currentEvent?.tag}</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: 'var(--text-on-dark)', lineHeight: 1.2, margin: '0.5rem 0' }}>{currentEvent?.title}</h2>
          <p style={{ color: 'var(--text-on-dark-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{currentEvent?.description}</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '0.75rem', flexShrink: 0 }}>
          <svg width="160" height="60" viewBox="0 0 160 60">
            <polyline points={CHART_PTS} stroke="white" strokeOpacity="0.6" fill="none" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="160" cy="14" r="4" fill="white" fillOpacity="0.8" />
          </svg>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {isPositive ? (
          <div className="card" style={{ padding: '1.25rem', borderLeft: '3px solid var(--green)' }}>
            <span className="tag tag-green" style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>{currentEvent.tag}</span>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--green)', marginBottom: '0.5rem' }}>Good news for your company</div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 0.75rem' }}>{currentEvent.description}</p>
            {[['Cash', `+${fmtM(currentEvent.impact.cashDelta)}`], ['Value', `+${fmtM(currentEvent.impact.valueDelta)}`], ['Confidence', `+${currentEvent.impact.confidenceDelta} pts`]].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '0.2rem 0' }}>
                <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</span>
                <span style={{ color: 'var(--green)', fontWeight: 600 }}>{val}</span>
              </div>
            ))}
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>These gains have been automatically applied to your company.</p>
          </div>
        ) : (
          <div className="card" style={{ padding: '1.25rem', borderLeft: '3px solid var(--blue)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
              <span style={{ background: 'var(--blue)', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>AI</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Claude Analysis</span>
            </div>
            {analysisLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '0.5rem' }}>
                <LoadingShimmer height="1rem" width="100%" />
                <LoadingShimmer height="1rem" width="90%" />
                <LoadingShimmer height="0.7rem" width="60%" />
              </div>
            ) : debriefText ? (
              <p style={{ opacity: analysisVisible ? 1 : 0, transition: 'opacity 0.4s ease', fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{debriefText}</p>
            ) : (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>AI analysis unavailable this round.</p>
            )}
          </div>
        )}
        <div className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>Ready for Round {round}?</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Your event has been processed and results logged.</div>
          {[['Decision Logged', true], ['Analysis Generated', !analysisLoading && !!debriefText], ['Round Preparation', true]].map(([label, done]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}>
              <span style={{ color: done ? 'var(--green)' : 'var(--text-muted)', fontSize: '1rem' }}>{done ? '✓' : '○'}</span>
              <span style={{ color: done ? 'var(--text-primary)' : 'var(--text-muted)' }}>{label}</span>
            </div>
          ))}
          <button className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={nextPhase}>Proceed to Round {round + 1} →</button>
          <div style={{ marginTop: 4 }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Round Progress</div>
            <div style={{ height: 6, background: 'var(--border)', borderRadius: 3 }}><div style={{ height: '100%', width: `${(round / 6) * 100}%`, background: 'var(--blue)', borderRadius: 3 }} /></div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {[['Debt Service Cost', `+${fmtM((state.totalDebt ?? 0) * 0.01)}/mo`], ['Equity Retained', `${state.equityRetained ?? 100}%`]].map(([label, val]) => (
          <div key={label} className="card" style={{ padding: '0.875rem 1.125rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: 4 }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
