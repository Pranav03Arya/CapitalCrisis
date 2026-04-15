import { motion } from 'framer-motion'

const fmtM = (n) => n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${(n / 1_000).toFixed(0)}K`
const pulse = { scale: [1, 1.04, 1], transition: { duration: 0.3 } }

function Metric({ accent, icon, label, value, sub, subColour }) {
  return (
    <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 10, paddingTop: 6, paddingBottom: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
        <span style={{ color: accent, lineHeight: 0 }}>{icon}</span>
        <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent }}>{label}</span>
      </div>
      <motion.div animate={pulse} key={value} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
        {value}
      </motion.div>
      <div style={{ fontSize: '0.72rem', color: subColour ?? 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
    </div>
  )
}

const Divider = () => <div style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} />

export default function GameSidebar({ state }) {
  const { companyValue, cashOnHand, stakeholderConfidence, monthlyBurnRate, valueHistory, cashHistory } = state
  const prevVal  = valueHistory.length > 1 ? valueHistory[valueHistory.length - 2] : companyValue
  const prevCash = cashHistory.length  > 1 ? cashHistory[cashHistory.length - 2]   : cashOnHand
  const valDelta = prevVal  ? ((companyValue - prevVal)  / prevVal  * 100).toFixed(1) : null
  const confLabel = stakeholderConfidence >= 60 ? 'Positive' : stakeholderConfidence >= 30 ? 'Neutral' : 'Critical'
  const confColour = stakeholderConfidence >= 60 ? 'var(--green)' : stakeholderConfidence >= 30 ? 'var(--amber)' : 'var(--red)'

  return (
    <aside style={{
      position: 'fixed', top: 'var(--header-height)', left: 0,
      width: 'var(--sidebar-width)', minWidth: 230, maxWidth: 230, flexShrink: 0, height: 'calc(100vh - var(--header-height))',
      background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)',
      padding: '20px 16px', display: 'flex', flexDirection: 'column', zIndex: 90,
    }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Live Numbers</div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 14, marginTop: 2 }}>Current Round Tracking</div>
      <Metric accent="var(--blue)" label="Company Value" value={fmtM(companyValue)}
        sub={valDelta !== null ? `${valDelta >= 0 ? '+' : ''}${valDelta}% vs prev` : 'Baseline'}
        subColour={valDelta >= 0 ? 'var(--green)' : 'var(--red)'}
        icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>} />
      <Divider />
      <Metric accent="var(--text-secondary)" label="Cash on Hand" value={fmtM(cashOnHand)}
        sub={`Burns $${fmtM(monthlyBurnRate ?? 0)}/mo`}
        subColour={(monthlyBurnRate ?? 0) > cashOnHand / 6 ? 'var(--red)' : 'var(--text-muted)'}
        icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>} />
      <Divider />
      <Metric accent={confColour} label="Confidence" value={`${stakeholderConfidence}%`}
        sub={confLabel} subColour={confColour}
        icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} />
      <div style={{ marginTop: 'auto' }}>
        <button className="btn-ghost" style={{ width: '100%', fontSize: '0.82rem' }}>View Full Report</button>
      </div>
    </aside>
  )
}
