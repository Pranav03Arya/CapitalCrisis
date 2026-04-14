import { useState, useEffect } from 'react'

const fmtM = (n) => `$${(n / 1_000_000).toFixed(2)}M`

export function useClaudeDebrief(state, setDebrief) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { companyValue, cashOnHand, stakeholderConfidence, lastDecisions } = state
    const prompt = `You are a finance tutor for university students. In exactly 2 sentences of plain English with no abbreviations and no jargon, explain what happened to this company this round and the single most important lesson. Round: ${state.round}. Company value: ${fmtM(companyValue)}. Cash: ${fmtM(cashOnHand)}. Confidence: ${stakeholderConfidence}%. Decisions made: ${JSON.stringify(lastDecisions)}.`

    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 180, messages: [{ role: 'user', content: prompt }] }),
    })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(d => setDebrief(d.content?.[0]?.text ?? ''))
      .catch(() => setDebrief('Your decisions this round had a direct impact on the company\'s financial position. Study the numbers above to see exactly which choice had the biggest effect.'))
      .finally(() => setLoading(false))
  }, [state.round]) // eslint-disable-line react-hooks/exhaustive-deps

  return { loading }
}
