import ValueChart from '../components/ValueChart.jsx'

const fmtM = (n) => `$${(n / 1_000_000).toFixed(2)}M`
const fmtP = (n) => `${n}%`

export default function ResultsScreen({ state, nextPhase }) {
  const { companyValue, cashOnHand, stakeholderConfidence, prevMetrics, round, gameOver } = state
  const prev = prevMetrics ?? { companyValue, cashOnHand, stakeholderConfidence }
  const ch   = { cv: companyValue - prev.companyValue, cash: cashOnHand - prev.cashOnHand, conf: stakeholderConfidence - prev.stakeholderConfidence }

  const deltas = [
    { label: 'Company Value',          old: fmtM(prev.companyValue),              cur: fmtM(companyValue),              ok: ch.cv   >= 0 },
    { label: 'Cash on Hand',           old: fmtM(prev.cashOnHand),               cur: fmtM(cashOnHand),               ok: ch.cash >= 0 },
    { label: 'Stakeholder Confidence', old: fmtP(prev.stakeholderConfidence),     cur: fmtP(stakeholderConfidence),     ok: ch.conf >= 0 },
  ]

  const biggestDrop = ch.cv < ch.cash ? 'cv' : 'cash'
  const summary = ch[biggestDrop] < 0
    ? biggestDrop === 'cv'
      ? 'Company value fell this round — the event eroded investor confidence and the asset base.'
      : 'Cash reserves took the biggest hit — monitor liquidity carefully going into the next round.'
    : ch.cv > 0
    ? 'Your company grew in value this round — the decisions you made are compounding positively.'
    : 'A stable round — keep building toward your target valuation.'

  return (
    <div style={{ maxWidth: 860, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--text-primary)', margin: 0 }}>What changed this round</h2>
        {deltas.map(d => (
          <div key={d.label} className="card" style={{ padding: '0.875rem 1.125rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{d.label}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>{d.old}</span>
              <span style={{ color: 'var(--text-muted)', margin: '0 0.35rem' }}>→</span>
              <strong style={{ color: d.ok ? 'var(--green)' : 'var(--red)' }}>{d.cur}</strong>
            </span>
          </div>
        ))}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{summary}</p>
        <button className="btn-primary" onClick={nextPhase}>
          {gameOver ? 'See Final Outcome →' : 'Learn Why This Happened →'}
        </button>
      </div>
      <ValueChart state={state} />
    </div>
  )
}
