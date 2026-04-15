import { motion } from 'framer-motion'
import SetupSectorGrid from './SetupSectorGrid.jsx'
import SetupCapitalGrid from './SetupCapitalGrid.jsx'
import SetupOptionRow from './SetupOptionRow.jsx'
import { RISK_PROFILES, DIFFICULTY_MODES, STARTING_VALUATIONS } from '../engine/setupConfig.js'

const Sec = ({ delay, children }) => <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay }}>{children}</motion.div>
const lbl = { fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }

export default function SetupFormLeft(p) {
  const { companyName, setCompanyName, tickerSymbol, setTickerSymbol,
          sector, setSector, capital, setCapital, difficulty, setDifficulty,
          riskAppetite, setRiskAppetite, startingValuation, setValuation } = p
  return (
    <>
      <Sec delay={0.08}>
        <span className="label-caps">YOUR COMPANY</span>
        <div style={{ display: 'flex', gap: 12, marginTop: '0.5rem' }}>
          <div style={{ flex: 1 }}>
            <label style={lbl}>Company Name</label>
            <input className="setup-input" value={companyName} maxLength={24} onChange={e => setCompanyName(e.target.value)} placeholder="e.g. NovaCorp" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={lbl}>Ticker Symbol</label>
            <input className="setup-input" value={tickerSymbol} maxLength={4} onChange={e => setTickerSymbol(e.target.value.toUpperCase())} placeholder="e.g. NOVA" />
          </div>
        </div>
      </Sec>
      <Sec delay={0.12}><span className="label-caps">SECTOR</span><SetupSectorGrid selected={sector} onSelect={setSector} /></Sec>
      <Sec delay={0.16}><span className="label-caps">FUNDING STRUCTURE</span><SetupCapitalGrid selected={capital} onSelect={setCapital} /></Sec>
      <Sec delay={0.20}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <span className="label-caps">RISK APPETITE</span>
            <SetupOptionRow items={RISK_PROFILES} selected={riskAppetite} onSelect={setRiskAppetite} layout="column" />
          </div>
          <div style={{ flex: 1 }}>
            <span className="label-caps">STARTING VALUATION</span>
            <SetupOptionRow items={STARTING_VALUATIONS} selected={startingValuation} onSelect={setValuation} layout="column" getKey={item => item.value} getLabel={item => item.label} getSub={item => item.stage} />
          </div>
        </div>
      </Sec>
      <Sec delay={0.24}><span className="label-caps">MARKET CONDITIONS</span><SetupOptionRow items={DIFFICULTY_MODES} selected={difficulty} onSelect={setDifficulty} layout="row" /></Sec>
    </>
  )
}
