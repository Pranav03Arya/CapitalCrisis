import { createInitialState } from './initialState.js'
import { applyBorrowingDecision, applyInvestmentDecision, applyRiskDecision } from './financialEngine.js'
import { handleNextPhase } from './nextPhaseHandler.js'

export function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return createInitialState({ ...action.params, phase: 'briefing' })

    case 'NEXT_PHASE': {
      const next = handleNextPhase(state)
      return state.phase === 'learn' ? { ...next, debriefText: '' } : next
    }

    case 'SUBMIT_DECISIONS':
      return { ...state, lastDecisions: { ...state.lastDecisions, ...action.decisions } }

    case 'APPLY_EVENT_RESULT': {
      const prevMetrics = { companyValue: state.companyValue, cashOnHand: state.cashOnHand, stakeholderConfidence: state.stakeholderConfidence }
      if (!state.currentEvent) return { ...state, prevMetrics }
      if (state.currentEvent.type === 'positive') {
        const { cashDelta, valueDelta, confidenceDelta } = state.currentEvent.impact
        return { ...state, prevMetrics, cashOnHand: state.cashOnHand + cashDelta, companyValue: state.companyValue + valueDelta, stakeholderConfidence: Math.min(100, Math.max(0, state.stakeholderConfidence + confidenceDelta)) }
      }
      const result = applyRiskDecision(state, state.lastDecisions.riskChoice ?? 'gamble', state.currentEvent)
      return { ...state, ...result, prevMetrics }
    }

    case 'APPLY_FINANCIAL_RESULTS': {
      const { borrowAmount, equityPercent, projectIndex } = state.lastDecisions
      let s = { ...state }
      if (borrowAmount != null || equityPercent != null)
        s = { ...s, ...applyBorrowingDecision(s, { borrowAmount: borrowAmount ?? 0, equityPercent: equityPercent ?? 0 }) }
      if (projectIndex != null)
        s = { ...s, ...applyInvestmentDecision(s, projectIndex) }
      return s
    }

    case 'SET_DEBRIEF':
      return { ...state, debriefText: action.text }

    case 'SET_PHASE':
      return { ...state, phase: action.phase }

    case 'RESTART':
      return createInitialState()

    default:
      return state
  }
}
