import { useState } from 'react'

const fmtM = (n) => `$${(n / 1_000_000).toFixed(2)}M`

const PROJECTS = [
  { name: 'Expand the warehouse',     desc: 'Upgrade storage and throughput capacity to handle growing order volume.',    cost: 1_500_000, ret: 1_900_000, risk: 'Low',    riskTag: 'tag-green', riskColour: 'var(--green)' },
  { name: 'Launch a new product line', desc: 'Develop and market a complementary product to capture adjacent demand.',       cost: 2_500_000, ret: 3_750_000, risk: 'Medium', riskTag: 'tag-amber', riskColour: 'var(--amber)' },
  { name: 'Enter a new market',        desc: 'Expand into an international territory with high upside and execution risk.', cost: 3_500_000, ret: 6_000_000, risk: 'High',   riskTag: 'tag-red',   riskColour: 'var(--red)'   },
]

export default function InvestmentPanel({ onUpdate }) {
  const [selected, setSelected] = useState(null)

  const pick = (i) => { setSelected(i); onUpdate({ projectIndex: i }) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Which project will you invest in this round?</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.875rem' }}>
        {PROJECTS.map((p, i) => (
          <div key={i} onClick={() => pick(i)} className={`card choice-card${selected === i ? ' selected' : ''}`} style={{ cursor: 'pointer', padding: '1.125rem', position: 'relative', border: selected === i ? '2px solid var(--blue)' : '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {selected === i && <span style={{ position: 'absolute', top: -10, right: -10, background: 'var(--blue)', color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>}
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{p.name}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{p.desc}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Cost</span>
              <span style={{ color: 'var(--red)', fontWeight: 600 }}>{fmtM(p.cost)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Expected Return</span>
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>{fmtM(p.ret)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className={`tag ${p.riskTag}`}>{p.risk} Risk</span>
              {p.risk === 'High' && <span style={{ fontSize: '0.68rem', color: 'var(--red)', fontWeight: 600 }}>40% failure chance</span>}
              {p.risk !== 'High' && <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>2 rounds</span>}
            </div>
            <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem', width: '100%' }} onClick={(e) => { e.stopPropagation(); pick(i) }}>Select</button>
          </div>
        ))}
      </div>
    </div>
  )
}
