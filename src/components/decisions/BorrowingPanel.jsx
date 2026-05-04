import { useState } from 'react'

const fmtM = (n) => `$${(n / 1_000_000).toFixed(2)}M`
const BORROW_AMOUNT = 2_000_000
const EQUITY_PCT    = 10

function ChoiceCard({ selected, onSelect, iconBg, title, desc, row1, row2, btnLabel }) {
  return (
    <div onClick={onSelect} className={`card choice-card${selected ? ' selected' : ''}`} style={{ flex: 1, padding: '1.25rem', cursor: 'pointer', position: 'relative', border: selected ? '2px solid var(--blue)' : '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {selected && <span style={{ position: 'absolute', top: -10, right: -10, background: 'var(--blue)', color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>✓</span>}
      <div style={{ width: 36, height: 36, borderRadius: 8, background: iconBg }} />
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{title}</div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</div>
      <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{row1.label}</span><span style={{ color: row1.colour, fontWeight: 600 }}>{row1.value}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{row2.label}</span><span style={{ color: row2.colour, fontWeight: 600 }}>{row2.value}</span></div>
      </div>
      <button className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.55rem 1rem', marginTop: 'auto', width: '100%' }} onClick={(e) => { e.stopPropagation(); onSelect() }}>{btnLabel}</button>
    </div>
  )
}

export default function BorrowingPanel({ state, onUpdate }) {
  const [choice, setChoice] = useState(null)
  const { companyValue } = state
  const interest  = BORROW_AMOUNT * 0.01 * 12
  const raised    = companyValue * (EQUITY_PCT / 100) * 0.4
  const dilution  = companyValue * (EQUITY_PCT / 100) * 0.15

  const pick = (c) => { setChoice(c); onUpdate(c === 'borrow' ? { borrowAmount: BORROW_AMOUNT, equityPercent: 0 } : { borrowAmount: 0, equityPercent: EQUITY_PCT }) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>How will you raise money this round?</h3>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <ChoiceCard selected={choice === 'borrow'} onSelect={() => pick('borrow')} iconBg="var(--blue-light)" title="Borrow from the bank" desc="Secure a loan to maintain full ownership." row1={{ label: 'Interest Rate', value: `${fmtM(interest)}/yr`, colour: 'var(--red)' }} row2={{ label: 'Impact', value: '0% Dilution', colour: 'var(--green)' }} btnLabel="Select Strategy" />
        <ChoiceCard selected={choice === 'equity'} onSelect={() => pick('equity')} iconBg="var(--green-light)" title="Sell shares to investors" desc="Partner with investors for a long-term capital buffer." row1={{ label: 'Capital Raised', value: fmtM(raised), colour: 'var(--green)' }} row2={{ label: 'Dilution', value: `${EQUITY_PCT}%`, colour: 'var(--red)' }} btnLabel="Accept Investment" />
      </div>
    </div>
  )
}
