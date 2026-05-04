export function checkOutcome(state) {
  const { cashOnHand, round, companyValue, stakeholderConfidence } = state

  if (cashOnHand <= 0) return 'bankrupt'

  if (round > 6) {
    const base = state.startingValue ?? 10_000_000
    if (companyValue >= base * 1.6 && stakeholderConfidence >= 65) return 'floated'
    if (companyValue >= base * 1.3) return 'sold'
    return 'survived'
  }

  return null
}
