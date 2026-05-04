import { useReducer } from 'react'
import { gameReducer } from '../engine/gameReducer.js'
import { createInitialState } from '../engine/initialState.js'

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState)

  return {
    state,
    startGame:             (params)    => dispatch({ type: 'START_GAME', params }),
    nextPhase:             ()          => dispatch({ type: 'NEXT_PHASE' }),
    submitDecisions:       (decisions) => dispatch({ type: 'SUBMIT_DECISIONS', decisions }),
    applyEventResult:      ()          => dispatch({ type: 'APPLY_EVENT_RESULT' }),
    applyFinancialResults: ()          => dispatch({ type: 'APPLY_FINANCIAL_RESULTS' }),
    setDebrief:            (text)      => dispatch({ type: 'SET_DEBRIEF', text }),
    setPhase:              (phase)     => dispatch({ type: 'SET_PHASE', phase }),
    restart:               ()          => dispatch({ type: 'RESTART' }),
  }
}
