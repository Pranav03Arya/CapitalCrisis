import { useState } from 'react'
import { motion } from 'framer-motion'
import { buildStartParams } from '../engine/buildStartParams.js'
import SetupFormLeft from '../components/SetupFormLeft.jsx'
import SetupPreviewCard from '../components/SetupPreviewCard.jsx'

export default function SetupScreen({ startGame, goBack }) {
  const [companyName,      setCompanyName]  = useState('')
  const [tickerSymbol,     setTickerSymbol] = useState('')
  const [sector,           setSector]       = useState('technology')
  const [capital,          setCapital]      = useState('bank')
  const [difficulty,       setDifficulty]   = useState('normal')
  const [riskAppetite,     setRiskAppetite] = useState('balanced')
  const [startingValuation, setValuation]   = useState(10_000_000)

  const liveParams = buildStartParams({ companyName, tickerSymbol, sector, capital, difficulty, riskAppetite, startingValuation })
  const canLaunch  = companyName.trim().length > 0 && tickerSymbol.trim().length > 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', padding: '48px 24px 80px' }}>
      <div style={{ width: '100%', maxWidth: 880, margin: '0 auto' }}>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} style={{ marginBottom: '2rem' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.85rem', padding: 0, marginBottom: '1rem' }}>← Back</button>
          <h2>Build Your Company</h2>
          <p>Customise your starting position. Every parameter has a consequence.</p>
        </motion.div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <SetupFormLeft
              companyName={companyName} setCompanyName={setCompanyName}
              tickerSymbol={tickerSymbol} setTickerSymbol={setTickerSymbol}
              sector={sector} setSector={setSector}
              capital={capital} setCapital={setCapital}
              difficulty={difficulty} setDifficulty={setDifficulty}
              riskAppetite={riskAppetite} setRiskAppetite={setRiskAppetite}
              startingValuation={startingValuation} setValuation={setValuation}
            />
          </div>
          <div style={{ width: 280, flexShrink: 0, position: 'sticky', top: 88 }}>
            <SetupPreviewCard params={liveParams} canLaunch={canLaunch} onLaunch={() => startGame(liveParams)} />
          </div>
        </div>
      </div>
    </div>
  )
}
