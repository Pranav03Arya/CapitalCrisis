import { EVENTS } from './events.js'
import { resolvePendingInvestments, applyRoundRevenue } from './financialEngine.js'
import { checkOutcome } from './winConditions.js'

const PHASES = ['briefing', 'decision', 'event', 'results', 'learn']

export function handleNextPhase(state) {
  const idx  = PHASES.indexOf(state.phase)
  const next = PHASES[(idx + 1) % PHASES.length]
  if (next !== 'briefing') return {
    ...state, phase: next,
    currentEvent: next === 'event' ? EVENTS[state.round - 1] : state.currentEvent,
  }
  const round = state.round + 1
  let s = { ...state, phase: 'briefing', round, lastDecisions: {}, debriefText: '', prevMetrics: null }
  const rev = applyRoundRevenue(s)
  s = { ...s, cashOnHand: rev.cashOnHand }
  const inv = resolvePendingInvestments({ ...s, round })
  if (inv.resolved) s = { ...s, ...inv, pendingInvestment: null }
  s.valueHistory = [...state.valueHistory, s.companyValue]
  s.cashHistory  = [...state.cashHistory,  s.cashOnHand]
  const outcome = checkOutcome({ ...s, round })
  if (outcome) return { ...s, round, gameOver: true, gameOutcome: outcome }
  return { ...s, round }
}
