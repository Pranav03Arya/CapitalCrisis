import { useState } from 'react'
import { ROUND_DESCRIPTIONS } from '../utils/roundDescriptions.js'
import { EVENTS } from '../engine/events.js'
import BorrowingPanel  from '../components/decisions/BorrowingPanel.jsx'
import InvestmentPanel from '../components/decisions/InvestmentPanel.jsx'
import RiskPanel       from '../components/decisions/RiskPanel.jsx'

const SENTIMENT = { 1:'BEARISH',2:'BEARISH',3:'BULLISH',4:'BEARISH',5:'BULLISH',6:'BEARISH' }
const SENTIMENT_BODY = { 1:'Rates are rising and capital is getting expensive.',2:'Client concentration risk is elevated across the sector.',3:'Innovation is driving new opportunities despite the environment.',4:'Quality and compliance failures are spooking investors.',5:'Commodity prices have stabilised but the outlook remains uncertain.',6:'GDP is contracting and consumer confidence has collapsed.' }

function HeadingBlue({ text }) {
  const parts = text.split(/(__[^_]+__)/)
  return <h2 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.7rem', color:'var(--text-primary)', lineHeight:1.2, margin:0 }}>
    {parts.map((p,i) => p.startsWith('__') ? <span key={i} style={{ color:'var(--blue)', fontStyle:'italic' }}>{p.replace(/__/g,'')}</span> : <span key={i}>{p}</span>)}
  </h2>
}

export default function DecisionScreen({ state, submitDecisions, nextPhase }) {
  const { round } = state
  const [decision, setDecision] = useState(null)
  const desc    = ROUND_DESCRIPTIONS[round - 1]
  const event   = round >= 5 ? EVENTS[round - 1] : null
  const Panel   = round <= 2 ? BorrowingPanel : round <= 4 ? InvestmentPanel : RiskPanel
  const ready   = decision !== null && (round <= 2 ? ('borrowAmount' in decision || 'equityPercent' in decision) : round <= 4 ? decision.projectIndex != null : decision.riskChoice != null)
  const bullish = SENTIMENT[round] === 'BULLISH'

  return (
    <div style={{ maxWidth: 860, display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <span className="tag tag-red">{desc.conceptName}</span>
        <span style={{ fontSize:'0.8rem', fontWeight:700, color:'var(--text-muted)' }}>ROUND {round}/6</span>
      </div>
      <HeadingBlue text={desc.scenarioHeading} />
      <Panel state={state} event={event} onUpdate={setDecision} />
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
        <div style={{ borderLeft:'3px solid var(--blue)', paddingLeft:14 }} className="card">
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'0.5rem' }}>
            <span style={{ background:'var(--blue)', borderRadius:'50%', width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'0.75rem', fontWeight:700, flexShrink:0 }}>i</span>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.85rem', color:'var(--text-primary)' }}>The Analyst's View</span>
          </div>
          <p style={{ fontSize:'0.85rem', color:'var(--text-secondary)', fontStyle:'italic', lineHeight:1.6, margin:0 }}>"{desc.analystQuote}"</p>
        </div>
        <div className="card-dark" style={{ padding:'1.125rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-on-dark-muted)', marginBottom:6 }}>Market Sentiment</div>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.8rem', color: bullish ? 'var(--green)' : 'var(--red)', lineHeight:1 }}>{SENTIMENT[round]}</div>
          <div style={{ fontSize:'0.8rem', color:'var(--text-on-dark-muted)', marginTop:6, lineHeight:1.5 }}>{SENTIMENT_BODY[round]}</div>
        </div>
      </div>
      <div style={{ display:'flex', justifyContent:'flex-end' }}>
        <button className="btn-primary" disabled={!ready} onClick={() => { submitDecisions(decision); nextPhase() }}
          style={{ opacity: ready ? 1 : 0.45, cursor: ready ? 'pointer' : 'not-allowed' }}>
          Lock In My Decision →
        </button>
      </div>
    </div>
  )
}
