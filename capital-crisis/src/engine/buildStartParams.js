import { SECTORS, CAPITAL_STRUCTURES, DIFFICULTY_MODES, RISK_PROFILES } from './setupConfig.js'

export function buildStartParams(choices) {
  const sector  = SECTORS.find(s => s.id === choices.sector)             ?? SECTORS[0]
  const capital = CAPITAL_STRUCTURES.find(c => c.id === choices.capital) ?? CAPITAL_STRUCTURES[1]
  const diff    = DIFFICULTY_MODES.find(d => d.id === choices.difficulty) ?? DIFFICULTY_MODES[1]
  const risk    = RISK_PROFILES.find(r => r.id === choices.riskAppetite)  ?? RISK_PROFILES[1]
  const baseVal = choices.startingValuation ?? 10_000_000

  const round = (n) => Math.round(n / 10000) * 10000

  const companyValue          = round(baseVal * sector.statModifiers.companyValue * risk.companyValueMod)
  const cashOnHand            = round(capital.statOverrides.cashOnHand * risk.cashMod)
  const totalDebt             = capital.statOverrides.totalDebt
  const equityRetained        = capital.statOverrides.equityRetained
  const stakeholderConfidence = Math.min(85, Math.max(20,
    60 + sector.statModifiers.confidence + capital.statOverrides.confidenceDelta + risk.confidenceDelta
  ))

  return {
    companyName:  choices.companyName || 'Capital Corp',
    tickerSymbol: (choices.tickerSymbol || 'CPCR').toUpperCase().slice(0, 4),
    sector:       sector.id,
    capital:      capital.id,
    difficultyMode:  diff.id,
    riskAppetite:    risk.id,
    companyValue, cashOnHand, totalDebt, equityRetained,
    stakeholderConfidence,
    monthlyBurnRate: 240_000,
    phase: 'briefing',
  }
}
