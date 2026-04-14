# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This git repo (`CapitalCrisis/`) is the root of a personal projects monorepo. The working tree here is empty; the active project lives in the sibling directory `../gamify2/`. The repo also tracks `../Advance stats for Data Science/` (Python/Jupyter data science work) as a sibling directory.

The primary project is **`../gamify2`** — a React app called "Debt vs. Equity Simulator".

## gamify2 — Debt vs. Equity Simulator

### Commands (run from `../gamify2/`)

```bash
npm start          # dev server at http://localhost:3000
npm test           # interactive test runner (Jest / React Testing Library)
npm run build      # production build to build/
```

To run a single test file:
```bash
npm test -- --testPathPattern=App.test
```

### Stack

- React 19, React Router v7, Create React App (react-scripts 5)
- XState v5 for app flow state machine
- Zustand v5 for session/scenario state
- D3 v7 for the interactive decision tree SVG
- Mixed `.jsx` and `.ts`/`.tsx` — JS files import TS files directly (CRA handles it)

### Architecture

**Pages** (`src/pages/`):
- `HomePage.tsx` — landing page with CTAs to guided/explore/dashboard modes
- `TreePage.jsx` — wraps the `DecisionTree` component; shows selected node name
- `DashboardPage.jsx` — full KPI dashboard with sliders, preferred stock controls, exit waterfall charts

**Core component** (`src/components/DecisionTree.jsx`):
- D3-rendered collapsible radial-style tree (horizontal layout, left-to-right)
- Accepts a `ref` with imperative `expandPath(ids[])` and `focusNode(id)` handles
- Collapses all sibling branches on click; animates node entry/exit at 520 ms
- Uses `resolveCollisions()` to push overlapping nodes apart at the same depth

**Data** (`src/data/financingTree.ts`):
- Single exported constant `financingTree` — a static `TreeNode` tree
- Leaf nodes carry an `outcome` with `summary`, `details`, and a `scorecard` (ownership_retained, dilution, bankruptcy_risk, growth_flexibility)
- Internal nodes have `children`; D3 hierarchy collapses to `_children` at runtime

**State** (`src/state/`):
- `sessionStore.ts` — Zustand store; holds `mode`, `selected` (chosen leaf + path IDs), `factors` (CustomerFactors), and `preferred` (PreferredConfig)
- `appMachine.ts` — XState machine mirroring the same four modes (home → explore/guided → dashboard); currently used for documentation/flow reference, not wired to routing directly

**Finance logic** (`src/utils/finance.ts`):
- Pure functions: `estimateRevenue`, `estimateCOGS`, `estimateEBITDA`, `annualDebtService`, `dscr`, `postMoneyOwnership`, `preferredWaterfallSingleRound`
- `preferredWaterfallSingleRound` handles non-participating vs. participating preferred with optional cap multiples

**Routing** (`src/App.js`): three routes (`/`, `/tree`, `/dashboard`); navigation goes through Zustand `setMode` then `useNavigate`.

### Key patterns

- `DashboardPage` derives `debtTerms` / `equityTerms` from `selected.pathIds` using `useMemo` — path IDs like `"term_low_rate"` or `"seriesA_20pct"` are the selector keys.
- Node color in the tree is determined by ancestry: walking up to find the `"debt"` node via `isDebt(d)`.
- CSS variables (`--debt`, `--equity`, `--outcome`, etc.) control tree colors; defined in `src/styles/`.
