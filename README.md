# Capital Crisis: The Chief Financial Officer Challenge

> 6 Rounds. 3 Decisions. 1 Goal — take your company public, or face bankruptcy.

Capital Crisis is a browser-based financial strategy game that puts you in the hot seat as CFO of a startup. You name the company, choose your sector, set your capital structure, and then survive six rounds of real-world financial pressure — rate hikes, competitor launches, product recalls, and recessions. At the end of each round, an AI tutor (powered by Claude) breaks down what your decisions actually did to the business.

It's part game, part finance education. Built for anyone who wants to feel what corporate finance actually costs before they study it in a textbook.

---

## What you actually do in the game

**Setup** — Before the simulation starts, you configure your company from scratch:
- Name your company and give it a ticker symbol
- Pick a sector: SaaS, Biotech, Retail, Construction, or Logistics — each one changes your starting numbers
- Choose your capital structure: Bootstrapped (full equity), Bank-Backed (debt), VC-Funded (diluted), or Mixed
- Set your market conditions: Bull, Normal, or Bear market
- Pick a risk profile: Conservative, Balanced, or Aggressive
- Choose a starting valuation between $500K and $10M

**Rounds 1–2: Borrowing decisions** — Do you take on more debt to grow faster, or sell equity and dilute your ownership? Every dollar of debt adds to your monthly burn. Every percent of equity you sell is gone permanently.

**Rounds 3–4: Investment decisions** — Three projects are on the table. The cheap one is safe. The expensive one has a 40% chance of failing. You pick one, and you wait two rounds to find out if it paid off.

**Rounds 5–6: Risk management** — A market shock hits every round (rate spike, recession, new competitor, product fault). You decide: pay the protection cost to buffer the damage, or take the full hit and preserve cash.

**Between every round** — A live market event fires, your metrics update, and Claude writes you a personalised two-sentence debrief explaining exactly what happened and what the lesson is.

**End outcomes** — Four ways it ends:
- **IPO** — company value grew 60%+ above your starting valuation, stakeholder confidence above 65
- **Acquisition** — you grew 30%+, a strategic buyer scoops you up
- **Survived** — you made it through six rounds without going under
- **Bankrupt** — you ran out of cash

---

## Tech stack

| Layer | What's used |
|---|---|
| Framework | React 19 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion |
| Charts | Recharts |
| AI debrief | Anthropic Claude Haiku (direct browser API) |

No backend, no database, no login. Everything runs in the browser. The only external call is to the Anthropic API to generate the per-round debrief.

---

## Project structure

```
capital-crisis/
└── src/
    ├── engine/              # All game logic — pure functions, no React
    │   ├── initialState.js      # Creates starting game state from setup params
    │   ├── gameReducer.js       # Central reducer — handles all state transitions
    │   ├── financialEngine.js   # applyBorrowingDecision, applyInvestmentDecision, applyRiskDecision
    │   ├── nextPhaseHandler.js  # Phase loop: briefing → decision → event → results → learn → repeat
    │   ├── winConditions.js     # checkOutcome: floated / sold / survived / bankrupt
    │   ├── events.js            # 6 scripted market events (one per round)
    │   ├── buildStartParams.js  # Computes starting state from setup screen choices
    │   └── setupConfig.js       # SECTORS, CAPITAL_STRUCTURES, DIFFICULTY_MODES, RISK_PROFILES
    ├── screens/             # One component per game phase
    │   ├── LandingScreen.jsx
    │   ├── SetupScreen.jsx
    │   ├── BriefingScreen.jsx
    │   ├── DecisionScreen.jsx   # Routes to BorrowingPanel / InvestmentPanel / RiskPanel by round
    │   ├── EventScreen.jsx
    │   ├── ResultsScreen.jsx
    │   ├── LearnScreen.jsx      # Calls Claude API while displaying a loading state
    │   └── EndScreen.jsx
    ├── components/          # Reusable UI pieces
    │   ├── decisions/           # BorrowingPanel, InvestmentPanel, RiskPanel
    │   ├── layout/              # GameLayout, GameHeader
    │   ├── MetricCard.jsx
    │   ├── ValueChart.jsx       # Recharts line chart of company value over time
    │   ├── OutcomeModal.jsx
    │   └── ...
    ├── hooks/
    │   ├── useGame.js           # useReducer wrapper — exposes all dispatch actions
    │   └── useClaudeDebrief.js  # Calls Anthropic API, returns { loading }
    └── utils/
        └── roundDescriptions.js # Scenario headings, concept definitions, analyst quotes per round
```

The game state lives entirely in a single `useReducer` at the top of `App.jsx`. There is no external state library. Every screen receives `state` and action dispatchers as props.

---

## Finance concepts the game teaches

Each round is built around one concept, surfaced through the decision you make:

| Round | Concept | Decision type |
|---|---|---|
| 1 | Cost of Debt vs. Equity | Borrow or dilute |
| 2 | Leverage & Burn Rate | More capital vs. staying lean |
| 3 | Capital Allocation | Low-risk vs. high-risk project investment |
| 4 | ROI & Payback Period | Committing to a longer return horizon |
| 5 | Risk Management | Pay for protection vs. absorbing market shocks |
| 6 | Recession Strategy | Defensive cash preservation vs. opportunistic spending |

---

## Getting started

**Prerequisites:** Node.js 18+ and an Anthropic API key.

```bash
# Clone and install
git clone https://github.com/your-username/capital-crisis.git
cd capital-crisis
npm install

# Set your API key
cp .env.example .env
# Open .env and paste your Anthropic API key as VITE_ANTHROPIC_API_KEY

# Start the dev server
npm run dev
```

Open `http://localhost:5173` and start the simulation.

> **Note on the API key:** The Claude debrief calls are made directly from the browser. This is fine for local development or personal projects, but you should not expose a production key in a public deployment. The game degrades gracefully — if the API call fails, it falls back to a static debrief message.

---

## Build for production

```bash
npm run build
```

Output goes to `dist/`. You can deploy the folder to any static host (Vercel, Netlify, GitHub Pages, etc.). Make sure to set `VITE_ANTHROPIC_API_KEY` as an environment variable in your host's settings rather than committing it to the repo.

### Deploy to Vercel (one-click)

Push to GitHub → import to Vercel → add `VITE_ANTHROPIC_API_KEY` in Vercel Environment Variables → Deploy.

---

## How the financial model works

The numbers are simplified for playability but the mechanics are real:

- **Debt** increases your cash immediately but adds 1% of the borrowed amount to your monthly burn rate each round
- **Equity dilution** gives you cash (40 cents per dollar of company value diluted) but permanently reduces your ownership percentage and slightly marks down company value
- **Investments** are deducted from cash immediately; the return lands two rounds later. High-risk projects have a 40% failure rate
- **Revenue** is generated every round based on stakeholder confidence — higher confidence means more revenue. The formula: `$400K × (0.7 + confidence/100 × 0.6)`
- **Market events** hit your cash, company value, and confidence directly. The `eventImpactMultiplier` from your chosen difficulty scales all impacts (0.7× in Bull, 1.4× in Bear)
- **Win condition** is evaluated after round 6: 1.6× starting value + 65%+ confidence = IPO; 1.3× = acquisition; anything less = survived; $0 cash at any point = bankrupt

---

## Known limitations

- Single-player only (multiplayer is surfaced in the UI but not implemented yet)
- The 6-event pool is fixed — each round always sees the same event, just scaled by difficulty
- No save/load — refreshing the page resets the game
- The "View Full Report" and "Download Investment Deck" buttons on the end screen are not yet wired up

---

## License

MIT
