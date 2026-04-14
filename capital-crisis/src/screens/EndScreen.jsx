import ValueChart from '../components/ValueChart.jsx'

const fmtM = (n) => `$${(n / 1_000_000).toFixed(2)}M`
const CONF_LABEL = (c) => c >= 70 ? 'Elite' : c >= 45 ? 'Strong' : 'Average'
const CONF_W     = (c) => `${c}%`
const CONFETTI   = ['#2B4BFF','#10B981','#F59E0B','#EF4444','#8B5CF6','#EC4899','#06B6D4','#84CC16','#F97316','#A855F7','#14B8A6','#FBBF24']

const OUTCOMES = {
  floated:  { line1: 'IPO',         line1c: 'var(--text-primary)', line2: 'SUCCESSFUL!', sub: 'You reached the public markets.',         growth: '+900% Growth' },
  sold:     { line1: 'ACQUISITION', line1c: 'var(--text-primary)', line2: 'COMPLETE!',    sub: 'A strategic buyer saw the value you built.', growth: '+500% Growth' },
  survived: { line1: 'YOU MADE IT', line1c: 'var(--amber)',        line2: '',             sub: 'The company survived all six rounds.',     growth: 'Still standing' },
  bankrupt: { line1: 'OUT OF',      line1c: 'var(--text-primary)', line2: 'CASH',         sub: 'The company ran out of liquidity.',         growth: 'Game Over' },
}

export default function EndScreen({ state, restart }) {
  const { gameOutcome, companyValue, cashOnHand, stakeholderConfidence, debriefText } = state
  const o = OUTCOMES[gameOutcome] ?? OUTCOMES.survived
  const conf = stakeholderConfidence

  return (
    <div style={{ maxWidth: 960, display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
      {gameOutcome === 'floated' && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {CONFETTI.map((c, i) => <div key={i} style={{ position: 'absolute', left: `${(i * 8.1) % 100}%`, bottom: '10%', width: 8, height: 8, borderRadius: 2, background: c, animation: `cf ${1.2 + (i % 4) * 0.3}s ease-out ${i * 0.12}s infinite` }} />)}
          <style>{`@keyframes cf { 0%{transform:translateY(0) rotate(0);opacity:1} 100%{transform:translateY(-130px) rotate(540deg);opacity:0} }`}</style>
        </div>
      )}
      <span className="tag tag-green" style={{ alignSelf: 'flex-start', position: 'relative', zIndex: 1 }}>Final Outcome</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '4rem', lineHeight: 1.05, margin: 0, position: 'relative', zIndex: 1 }}>
        <span style={{ color: o.line1c === 'var(--amber)' ? 'var(--amber)' : o.line2 === 'CASH' ? 'var(--text-primary)' : 'var(--text-primary)' }}>{o.line1} </span>
        {o.line2 && <span style={{ color: gameOutcome === 'bankrupt' ? 'var(--red)' : 'var(--blue)' }}>{o.line2}</span>}
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>{o.sub}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
        {[['Final Company Value', fmtM(companyValue), o.growth], ['Reserve Capital', fmtM(cashOnHand), 'Runway Secured ✓'], ['Market Trust', `${conf}%`, `${CONF_LABEL(conf)} Rating ✓`]].map(([label, val, sub]) => (
          <div key={label} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 6 }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--text-primary)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--green)', marginTop: 4 }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        <div className="card-dark" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-on-dark)' }}>Performance Summary</div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-on-dark-muted)', lineHeight: 1.65, margin: 0 }}>{debriefText || 'Six rounds of high-stakes decisions shaped the final outcome of your company.'}</p>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-on-dark-muted)', marginBottom: 6 }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>Strategy Breakdown</span>
              <span style={{ color: 'var(--text-on-dark)', fontWeight: 700 }}>{CONF_LABEL(conf)}</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.12)', borderRadius: 3 }}>
              <div style={{ height: '100%', width: CONF_W(conf), background: 'var(--green)', borderRadius: 3, transition: 'width 0.8s ease' }} />
            </div>
          </div>
        </div>
        <ValueChart state={state} height={260} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button className="btn-ghost">View Full Report</button>
        <button className="btn-primary" onClick={restart}>Play Again ↺</button>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: 'auto' }}>Download Comprehensive Investment Deck</span>
      </div>
    </div>
  )
}
