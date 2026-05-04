import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const fmtM = (v) => v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${(v / 1_000).toFixed(0)}K`

function Tip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 8, padding: '0.4rem 0.75rem', fontSize: '0.78rem', boxShadow: 'var(--shadow-raised)' }}>
      {payload.map(p => <div key={p.dataKey} style={{ color: p.stroke }}>{p.name}: {fmtM(p.value)}</div>)}
    </div>
  )
}

export default function ValueChart({ state, height = 220 }) {
  const data = state.valueHistory.map((v, i) => ({ round: `R${i + 1}`, value: v, cash: state.cashHistory?.[i] ?? null }))

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>Growth Trajectory</span>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', marginRight: 4 }} />Valuation</span>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', marginRight: 4 }} />Cash</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: 0 }}>
          <defs>
            <linearGradient id="gVal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2B4BFF" stopOpacity={0.2} /><stop offset="95%" stopColor="#2B4BFF" stopOpacity={0} /></linearGradient>
            <linearGradient id="gCash" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} /><stop offset="95%" stopColor="#EF4444" stopOpacity={0} /></linearGradient>
          </defs>
          <XAxis dataKey="round" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
          <Tooltip content={<Tip />} cursor={false} />
          <Area name="Valuation" type="monotone" dataKey="value" stroke="var(--blue)" strokeWidth={2} fill="url(#gVal)" dot={false} activeDot={{ r: 5, fill: '#fff', stroke: 'var(--blue)', strokeWidth: 2 }} />
          <Area name="Cash" type="monotone" dataKey="cash" stroke="var(--red)" strokeWidth={1.5} fill="url(#gCash)" dot={false} activeDot={{ r: 4, fill: '#fff', stroke: 'var(--red)', strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
