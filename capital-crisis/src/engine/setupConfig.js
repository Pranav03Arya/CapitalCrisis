export const SECTORS = [
  { id: 'technology',   label: 'SaaS Company',      emoji: '💻', description: 'Recurring software revenue. High growth potential but burn rate pressure.',              statModifiers: { companyValue: 1.0,  cashOnHand: 0.9,  confidence:  0, totalDebt: 1.0 } },
  { id: 'biotech',      label: 'Biotech Startup',   emoji: '💊', description: 'High upside on successful trials. Long runway required before revenue.',                  statModifiers: { companyValue: 1.3,  cashOnHand: 0.7,  confidence: -5, totalDebt: 0.8 } },
  { id: 'retail',       label: 'Retail Chain',      emoji: '☕', description: 'Predictable consumer revenue. Sensitive to market confidence shifts.',                    statModifiers: { companyValue: 0.8,  cashOnHand: 1.2,  confidence:  5, totalDebt: 1.1 } },
  { id: 'construction', label: 'Construction Firm', emoji: '🏗️', description: 'Large contracts but long payment cycles. Cash timing is critical.',                     statModifiers: { companyValue: 0.9,  cashOnHand: 0.8,  confidence:  0, totalDebt: 1.3 } },
  { id: 'logistics',    label: 'Logistics Company', emoji: '🚢', description: 'Steady operational revenue. Exposed to supply chain and fuel cost shocks.',              statModifiers: { companyValue: 0.85, cashOnHand: 1.1,  confidence:  3, totalDebt: 1.1 } },
]

export const CAPITAL_STRUCTURES = [
  { id: 'bootstrapped', label: 'Bootstrapped',  tagLabel: 'FULL EQUITY', tagColour: 'tag-green', description: 'Self-funded. No debt, no investors. Full control, limited capital.',                statOverrides: { cashOnHand: 1200000, totalDebt: 0,       equityRetained: 100, confidenceDelta:  5 } },
  { id: 'bank',         label: 'Bank-Backed',   tagLabel: 'DEBT FUNDED', tagColour: 'tag-amber', description: 'Traditional loan. Ownership intact but interest payments start immediately.',       statOverrides: { cashOnHand: 2800000, totalDebt: 4500000, equityRetained: 100, confidenceDelta:  0 } },
  { id: 'vc',           label: 'VC-Funded',     tagLabel: '30% DILUTED', tagColour: 'tag-blue',  description: 'Venture capital injected. High cash but 30% of the company is already sold.',      statOverrides: { cashOnHand: 5000000, totalDebt: 0,       equityRetained: 70,  confidenceDelta:  8 } },
  { id: 'mixed',        label: 'Mixed Funding', tagLabel: 'MIXED',       tagColour: 'tag-amber', description: 'Partial loan plus a small investor round. Balanced exposure on both sides.',       statOverrides: { cashOnHand: 2400000, totalDebt: 2000000, equityRetained: 85,  confidenceDelta:  2 } },
]

export const DIFFICULTY_MODES = [
  { id: 'bull',   label: 'Bull Market',   icon: '🌤️', description: 'Favourable conditions. Event shocks are reduced and recovery is faster.',              eventImpactMultiplier: 0.7 },
  { id: 'normal', label: 'Normal Market', icon: '☁️',  description: 'Balanced conditions. Standard event impacts and recovery rates.',                       eventImpactMultiplier: 1.0 },
  { id: 'bear',   label: 'Bear Market',   icon: '⛈️', description: 'Hostile conditions. Shocks hit harder and confidence is harder to recover.',            eventImpactMultiplier: 1.4 },
]

export const RISK_PROFILES = [
  { id: 'conservative', label: 'Conservative', icon: '🛡️', description: 'Lower debt, stronger confidence. Slower peak growth.',                              companyValueMod: 0.9,  cashMod: 1.1,  confidenceDelta:  8 },
  { id: 'balanced',     label: 'Balanced',     icon: '⚖️',  description: 'Default parameters. Steady exposure across all mechanics.',                         companyValueMod: 1.0,  cashMod: 1.0,  confidenceDelta:  0 },
  { id: 'aggressive',   label: 'Aggressive',   icon: '🎲',  description: 'Higher starting value, more debt, lower confidence. High ceiling, real floor.',     companyValueMod: 1.2,  cashMod: 0.85, confidenceDelta: -10 },
]

export const STARTING_VALUATIONS = [
  { value: 500000,    label: '$500K', stage: 'Early Stage'  },
  { value: 2000000,   label: '$2M',   stage: 'Seed Funded'  },
  { value: 5000000,   label: '$5M',   stage: 'Series A'     },
  { value: 10000000,  label: '$10M',  stage: 'Growth Stage' },
]
