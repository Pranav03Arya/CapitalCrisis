import { buildTable, buildChart, buildDecisions, buildFooter } from './reportTemplateParts.js'

const G = { floated:'linear-gradient(135deg,#10B981,#059669)', sold:'linear-gradient(135deg,#3B82F6,#2563EB)', survived:'linear-gradient(135deg,#F59E0B,#D97706)', bankrupt:'linear-gradient(135deg,#EF4444,#DC2626)' }
const L = { floated:'COMPANY FLOATED — IPO ACHIEVED', sold:'ACQUISITION COMPLETE', survived:'SURVIVED — ALL ROUNDS COMPLETED', bankrupt:'BANKRUPT — COMPANY FAILED' }
const CSS = `*{box-sizing:border-box;margin:0;padding:0}body{background:#EEF1F6;font-family:system-ui,-apple-system,sans-serif;color:#0F1117;padding:0 0 40px}.wrap{max-width:860px;margin:0 auto;padding:0 20px}.card{background:#fff;border-radius:12px;padding:1rem;border:1px solid #E5E7EB}.label{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9CA3AF;margin-bottom:6px}.val{font-weight:800;font-size:1.3rem}.sh{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#4B5563;margin:2rem 0 .75rem}table{width:100%;border-collapse:collapse;font-size:.85rem}th{background:#0F1117;color:#fff;padding:.6rem 1rem;text-align:left}td{padding:.6rem 1rem;border-bottom:1px solid #E5E7EB}tr:nth-child(even) td{background:#F9FAFB}`

export default function generateReportHTML({ meta, financials: f, grade, roundSummaries }) {
  const cc = f.finalConfidence >= 70 ? '#10B981' : f.finalConfidence >= 45 ? '#F59E0B' : '#EF4444'
  const fmM = v => `$${(v / 1e6).toFixed(2)}M`
  const stats = [
    ['Final Company Value', fmM(f.finalValue), '#2B4BFF'],
    ['Final Cash on Hand',  fmM(f.finalCash),  f.finalCash >= 0 ? '#10B981' : '#EF4444'],
    ['Company Growth',      `${f.valueChangePct}%`, parseFloat(f.valueChangePct) >= 0 ? '#10B981' : '#EF4444'],
    ['Stakeholder Confidence', `${f.finalConfidence}%`, cc],
    ['Total Debt',          fmM(f.finalDebt),  f.finalDebt > 0 ? '#EF4444' : '#10B981'],
  ]
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${meta.tickerSymbol} CFO Report</title><style>${CSS}</style></head><body>
<div style="background:#0F1117;padding:24px 40px;display:flex;justify-content:space-between;align-items:center">
  <div><span style="color:#2B4BFF;font-size:1.4rem;font-weight:700">${meta.tickerSymbol}</span><span style="color:#9CA3AF;font-size:1rem"> · ${meta.companyName}</span></div>
  <div style="text-align:right"><div style="color:#9CA3AF;font-size:.7rem;text-transform:uppercase;letter-spacing:.1em">CFO DECISION REPORT</div><div style="color:#fff;font-size:.75rem;margin-top:4px">${meta.generatedAt}</div></div>
</div>
<div style="background:${G[meta.outcome]??G.survived};padding:28px 40px;text-align:center">
  <div style="color:#fff;font-size:1.6rem;font-weight:800;letter-spacing:.05em">${L[meta.outcome]??'GAME OVER'}</div>
  <div style="color:rgba(255,255,255,.8);font-size:.85rem;margin-top:8px">${meta.sector} · ${meta.difficulty} · ${meta.riskAppetite}</div>
</div>
<div class="wrap">
<div style="display:flex;gap:1.25rem;margin-top:2rem;align-items:stretch">
  <div class="card" style="width:30%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;text-align:center;padding:1.5rem">
    <div style="font-size:5rem;font-weight:800;color:${grade.colour};line-height:1">${grade.letter}</div>
    <div style="font-size:1rem;font-weight:600">${grade.label}</div>
    <div style="font-size:.7rem;color:#9CA3AF">Final Performance Score</div>
  </div>
  <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
    ${stats.map(([l, v, c]) => `<div class="card"><div class="label">${l}</div><div class="val" style="color:${c}">${v}</div></div>`).join('')}
  </div>
</div>
${buildTable(roundSummaries)}${buildChart(f.valueHistory)}${buildDecisions(meta, f)}${buildFooter()}
</div></body></html>`
}
