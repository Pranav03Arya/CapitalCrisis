const MECHANICS = ['Debt vs Equity Financing','Cost of Capital','Investment Evaluation','Time Value of Money','Risk Management','Valuation & Exit']

function computeGrade({ gameOutcome, stakeholderConfidence, totalDebt, startingValue, companyValue }) {
  let score = 100
  if (gameOutcome === 'bankrupt')  score -= 20
  if (gameOutcome === 'survived')  score -= 10
  if (stakeholderConfidence < 50)  score -= 5
  if (totalDebt > startingValue * 0.5) score -= 5
  if ((companyValue - startingValue) / (startingValue || 1) < 0.1) score -= 5
  if (gameOutcome === 'floated')   score += 10
  if (stakeholderConfidence >= 70) score += 5
  if (score >= 90) return { letter: 'A', label: 'Exceptional CFO',    colour: '#10B981' }
  if (score >= 75) return { letter: 'B', label: 'Strong Performance', colour: '#3B82F6' }
  if (score >= 60) return { letter: 'C', label: 'Adequate Leadership',colour: '#F59E0B' }
  if (score >= 45) return { letter: 'D', label: 'Needs Improvement',  colour: '#F97316' }
  return { letter: 'F', label: 'Company Failed', colour: '#EF4444' }
}

function buildRoundSummaries({ valueHistory, cashHistory }) {
  return Array.from({ length: 6 }, (_, i) => {
    const r  = i + 1
    const vH = valueHistory ?? []
    const cH = cashHistory  ?? []
    const vE = vH[r]     ?? null
    const cE = cH[r]     ?? null
    const vP = vH[r - 1] ?? null
    return { round: r, mechanic: MECHANICS[i], valueAtEnd: vE, cashAtEnd: cE, valueDelta: vE !== null && vP !== null ? vE - vP : null }
  })
}

export default function buildReportData(state) {
  const { companyName, tickerSymbol, sector, gameOutcome, difficultyMode, riskAppetite,
    startingValue, companyValue, cashOnHand, totalDebt, stakeholderConfidence,
    equityRetained, valueHistory, cashHistory } = state
  return {
    meta: { companyName, tickerSymbol, sector, outcome: gameOutcome, difficulty: difficultyMode,
      riskAppetite, generatedAt: new Date().toLocaleDateString('en-GB', { dateStyle: 'long' }) },
    financials: { startingValue, finalValue: companyValue, finalCash: cashOnHand, finalDebt: totalDebt,
      finalConfidence: stakeholderConfidence, equityRetained,
      valueChange: companyValue - startingValue,
      valueChangePct: ((companyValue - startingValue) / (startingValue || 1) * 100).toFixed(1),
      valueHistory: valueHistory ?? [], cashHistory: cashHistory ?? [] },
    grade: computeGrade(state),
    roundSummaries: buildRoundSummaries(state),
  }
}
