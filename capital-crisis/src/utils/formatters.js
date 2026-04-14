const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export const formatDollars = (n) => usd.format(n)

export const formatMillions = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `$${Math.round(n / 1_000)}K`
  return formatDollars(n)
}

export const formatPercent = (n) => `${Math.round(n)}%`

export const formatDelta = (n) => ({
  text:     n >= 0 ? `+${formatMillions(n)}` : formatMillions(n),
  positive: n >= 0,
})

export const getDeltaColour = (n) =>
  n > 0 ? 'var(--green)' : n < 0 ? 'var(--red)' : 'var(--text-muted)'

export const getConfidenceLabel = (n) =>
  n < 35 ? 'Critical' : n < 55 ? 'Caution' : n < 70 ? 'Neutral' : n < 85 ? 'Positive' : 'Excellent'
