const PROJECTS = [
  { cost: 1_500_000, valueAdd: 1_900_000, isHighRisk: false },
  { cost: 2_500_000, valueAdd: 3_750_000, isHighRisk: false },
  { cost: 3_500_000, valueAdd: 6_000_000, isHighRisk: true  },
]

export function applyBorrowingDecision(state, { borrowAmount = 0, equityPercent = 0 }) {
  let { cashOnHand, totalDebt, monthlyBurnRate, companyValue, equityRetained } = state

  if (borrowAmount > 0) {
    cashOnHand      += borrowAmount
    totalDebt       += borrowAmount
    monthlyBurnRate += borrowAmount * 0.01
  }

  if (equityPercent > 0) {
    cashOnHand     += companyValue * (equityPercent / 100) * 0.4
    equityRetained -= equityPercent
    companyValue   -= companyValue * (equityPercent / 100) * 0.15
  }

  return { cashOnHand, totalDebt, monthlyBurnRate, companyValue, equityRetained }
}

export function applyInvestmentDecision(state, projectIndex) {
  const project = PROJECTS[projectIndex]
  const cashOnHand = state.cashOnHand - project.cost
  const pendingInvestment = {
    projectIndex,
    roundToResolve: state.round + 2,
    valueAdd:       project.valueAdd,
    isHighRisk:     project.isHighRisk,
  }
  return { cashOnHand, pendingInvestment }
}

export function applyRiskDecision(state, choice, event) {
  if (choice === 'protect') {
    return {
      cashOnHand: state.cashOnHand - event.protectCost,
      stakeholderConfidence: Math.min(100, state.stakeholderConfidence + (event.protectConfidenceBonus ?? 0)),
    }
  }
  return {
    cashOnHand: state.cashOnHand + event.impact.cashDelta,
    companyValue: state.companyValue + event.impact.valueDelta,
    stakeholderConfidence: Math.min(100, Math.max(0, state.stakeholderConfidence + event.impact.confidenceDelta)),
  }
}

export function applyRoundRevenue(state) {
  const confidenceMultiplier = 0.7 + (state.stakeholderConfidence / 100) * 0.6
  const revenue = Math.round(400_000 * confidenceMultiplier / 10_000) * 10_000
  return { cashOnHand: state.cashOnHand + revenue, revenueEarned: revenue }
}

export function resolvePendingInvestments(state) {
  const { pendingInvestment, round, companyValue, stakeholderConfidence } = state
  if (!pendingInvestment || pendingInvestment.roundToResolve !== round) return { resolved: false }

  const { isHighRisk, valueAdd } = pendingInvestment

  if (isHighRisk && Math.random() < 0.4) {
    return { resolved: true, success: false, stakeholderConfidence: stakeholderConfidence - 10 }
  }

  return { resolved: true, success: true, valueAdded: valueAdd, companyValue: companyValue + valueAdd, stakeholderConfidence: stakeholderConfidence + 6 }
}
