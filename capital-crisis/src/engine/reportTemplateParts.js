const fm = n => n != null ? `$${(n / 1e6).toFixed(2)}M` : '—'
const FUND = eq => eq === 100 ? 'You retained full equity — conservative, debt-free approach.' : eq === 70 ? 'You accepted VC dilution — traded 30% equity for capital.' : 'You used mixed funding — balanced debt and equity exposure.'
const RISK = r => r === 'conservative' ? 'Low-risk profile maintained throughout the simulation.' : r === 'aggressive' ? 'High-risk strategy — higher ceiling, real downside exposure.' : 'Balanced risk approach across all six rounds.'
const ICON = { floated: '🏆', sold: '🤝', survived: '😮', bankrupt: '💀' }

export function buildTable(rows) {
  const body = rows.map(r => {
    const col   = r.valueDelta == null ? '' : r.valueDelta >= 0 ? 'color:#10B981' : 'color:#EF4444'
    const arrow = r.valueDelta == null ? '' : r.valueDelta >= 0 ? '↑' : '↓'
    const delta = r.valueDelta != null ? `${arrow}${fm(Math.abs(r.valueDelta))}` : '—'
    return `<tr><td>${r.round}</td><td>${r.mechanic}</td><td>${fm(r.valueAtEnd)}</td><td>${fm(r.cashAtEnd)}</td><td style="${col}">${delta}</td></tr>`
  }).join('')
  return `<div class="sh">ROUND BY ROUND BREAKDOWN</div><table><tr><th>Round</th><th>Finance Concept</th><th>Company Value</th><th>Cash</th><th>Value Change</th></tr>${body}</table>`
}

export function buildChart(valueHistory) {
  const vals = Array.from({ length: 6 }, (_, i) => valueHistory[i + 1] ?? 0)
  const max  = Math.max(...vals, 1)
  const bars = vals.map((v, i) => `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><div style="font-size:.7rem;color:#4B5563">${v ? '$' + (v / 1e6).toFixed(1) + 'M' : '—'}</div><div style="width:40px;height:${Math.round(v / max * 120)}px;min-height:${v ? 2 : 0}px;background:#2B4BFF;border-radius:4px 4px 0 0"></div><div style="font-size:.75rem;color:#4B5563">R${i + 1}</div></div>`).join('')
  return `<div class="sh">GROWTH TRAJECTORY</div><div style="display:flex;align-items:flex-end;gap:12px;padding:1.25rem;background:#fff;border-radius:12px;border:1px solid #E5E7EB">${bars}</div>`
}

export function buildDecisions({ outcome, difficulty, riskAppetite }, f) {
  const pct = f.startingValue > 0 ? ((f.finalValue - f.startingValue) / f.startingValue * 100).toFixed(0) : 0
  const verb = outcome === 'bankrupt' ? 'went bankrupt' : outcome === 'floated' ? 'achieved an IPO' : outcome === 'sold' ? 'was acquired' : 'survived all six rounds'
  const outcomeMsg = `Company ${verb} on ${difficulty} difficulty with a ${pct >= 0 ? '+' : ''}${pct}% value change.`
  const cards = [['🏦','Funding Structure',FUND(f.equityRetained)],['🛡️','Risk Approach',RISK(riskAppetite)],[ICON[outcome]??'📊','Exit Outcome',outcomeMsg]]
  return `<div class="sh">FINANCIAL DECISIONS ANALYSIS</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem">${cards.map(([icon,h,b]) => `<div class="card"><div style="font-size:1.5rem;margin-bottom:.5rem">${icon}</div><div style="font-weight:700;margin-bottom:.5rem">${h}</div><div style="font-size:.85rem;color:#4B5563;line-height:1.6">${b}</div></div>`).join('')}</div>`
}

export function buildFooter() {
  const tags = ['Debt vs Equity','Time Value of Money','Risk Management'].map(t => `<span style="background:#E5E7EB;border-radius:6px;padding:3px 10px;font-size:.75rem;color:#4B5563">${t}</span>`).join(' · ')
  return `<div style="background:#F3F4F6;border-top:2px solid #E5E7EB;margin-top:2rem;padding:24px 40px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem"><div style="font-weight:700;font-size:.9rem">Capital Crisis — The CFO Challenge</div><div style="display:flex;gap:.5rem;align-items:center">${tags}</div><div style="font-size:.75rem;color:#9CA3AF">For educational purposes only. Paper simulation.</div></div>`
}
