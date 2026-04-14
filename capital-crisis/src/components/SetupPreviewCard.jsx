import { motion } from 'framer-motion'
import { SECTORS, CAPITAL_STRUCTURES, DIFFICULTY_MODES, RISK_PROFILES } from '../engine/setupConfig.js'
import { formatMillions, formatPercent } from '../utils/formatters.js'

const diffTag = { bull: 'tag-green', normal: 'tag-blue', bear: 'tag-amber' }
const HR = () => <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1rem 0' }} />
const Row = ({ label, value, colour }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0' }}>
    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>{label}</span>
    <motion.span layout style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: colour }}>{value}</motion.span>
  </div>
)

export default function SetupPreviewCard({ params, canLaunch, onLaunch }) {
  const sec  = SECTORS.find(s => s.id === params.sector)              ?? SECTORS[0]
  const cap  = CAPITAL_STRUCTURES.find(c => c.id === params.capital)  ?? CAPITAL_STRUCTURES[1]
  const diff = DIFFICULTY_MODES.find(d => d.id === params.difficultyMode) ?? DIFFICULTY_MODES[1]
  const risk = RISK_PROFILES.find(r => r.id === params.riskAppetite)  ?? RISK_PROFILES[1]
  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <span className="label-caps">YOUR STARTING POSITION</span>
      <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--blue)' }}>{params.tickerSymbol || 'CPCR'}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}> · {params.companyName || 'Capital Corp'}</span>
      </div>
      <span className="tag tag-blue" style={{ marginTop: '0.5rem', display: 'inline-flex' }}>{sec.label}</span>
      <HR />
      <Row label="COMPANY VALUE" value={formatMillions(params.companyValue)} colour="var(--blue)" />
      <Row label="CASH ON HAND"  value={formatMillions(params.cashOnHand)}   colour="var(--green)" />
      <Row label="CONFIDENCE"    value={formatPercent(params.stakeholderConfidence)} colour="var(--text-primary)" />
      <Row label="TOTAL DEBT"    value={formatMillions(params.totalDebt)}    colour={params.totalDebt > 0 ? 'var(--red)' : 'var(--green)'} />
      <HR />
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span className={`tag ${diffTag[params.difficultyMode] ?? 'tag-blue'}`}>{diff.icon} {diff.label}</span>
        <span className="tag tag-blue">{risk.icon} {risk.label}</span>
      </div>
      <div style={{ marginTop: '1rem', background: 'var(--blue-light)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
        You&apos;ve chosen a {sec.label} with {cap.label} funding in {diff.label} conditions. Starting value {formatMillions(params.companyValue)}, cash runway {formatMillions(params.cashOnHand)}.
      </div>
      <button className="btn-primary" style={{ width: '100%', height: 52, fontSize: '1rem', marginTop: '1.25rem' }} disabled={!canLaunch} onClick={onLaunch}>Launch Simulation ↗</button>
      {!canLaunch && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem', margin: '0.5rem 0 0' }}>Enter a company name and ticker to continue</p>}
    </div>
  )
}
