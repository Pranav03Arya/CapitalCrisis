export const EVENTS = [
  {
    round: 1, type: 'negative', title: 'Interest Rates Spiked!',
    tag: 'MARKET ALERT', tagColour: 'red',
    description: 'The central bank unexpectedly raised base rates. The cheap capital era is officially over.',
    impact: { cashDelta: -300_000, valueDelta: -800_000, confidenceDelta: -6 },
    protectCost: 250_000, protectConfidenceBonus: 3,
  },
  {
    round: 2, type: 'positive', title: 'New Market Opened!',
    tag: 'OPPORTUNITY', tagColour: 'green',
    description: 'Analysts identified an underserved market segment perfectly aligned with your product. Early movers are winning.',
    impact: { cashDelta: 500_000, valueDelta: 1_500_000, confidenceDelta: 8 },
    protectCost: 0, protectConfidenceBonus: 0,
  },
  {
    round: 3, type: 'negative', title: 'New Competitor Launched',
    tag: 'MARKET ALERT', tagColour: 'amber',
    description: 'A well-funded rival entered your market. You will need to cut prices to compete.',
    impact: { cashDelta: -200_000, valueDelta: -700_000, confidenceDelta: -5 },
    protectCost: 200_000, protectConfidenceBonus: 3,
  },
  {
    round: 4, type: 'negative', title: 'Product Fault Reported',
    tag: 'CRISIS ALERT', tagColour: 'red',
    description: 'Quality control flagged a defect in your flagship product. A recall may be necessary.',
    impact: { cashDelta: -600_000, valueDelta: -1_500_000, confidenceDelta: -10 },
    protectCost: 400_000, protectConfidenceBonus: 3,
  },
  {
    round: 5, type: 'positive', title: 'Government Grant Awarded!',
    tag: 'GOOD NEWS', tagColour: 'green',
    description: 'Your company was selected for a competitive innovation grant. No strings attached.',
    impact: { cashDelta: 400_000, valueDelta: 1_000_000, confidenceDelta: 6 },
    protectCost: 0, protectConfidenceBonus: 0,
  },
  {
    round: 6, type: 'negative', title: 'Recession Announced',
    tag: 'MARKET ALERT', tagColour: 'red',
    description: 'Economists confirmed the economy has entered recession. Consumer spending is contracting.',
    impact: { cashDelta: -700_000, valueDelta: -1_800_000, confidenceDelta: -8 },
    protectCost: 500_000, protectConfidenceBonus: 3,
  },
]
