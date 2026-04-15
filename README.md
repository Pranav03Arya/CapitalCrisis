# Capital Crisis — The Chief Financial Officer Challenge

A browser-based finance simulation game for university students.

## What students learn

- How companies choose between borrowing money and selling shares to investors
- How to evaluate an investment based on the timing and size of future cash returns
- How to weigh the cost of protecting against risk versus taking it on

## How to run locally

```bash
git clone [your-repo-url]
cd capital-crisis
npm install
cp .env.example .env
# Add your Anthropic API key to .env
npm run dev
```

## API key

One key required: `VITE_ANTHROPIC_API_KEY` from https://console.anthropic.com/settings/keys

Used only to generate the plain-English explanation after each round (Claude Haiku model).

## Deploy to Vercel

Push to GitHub → import to Vercel → add `VITE_ANTHROPIC_API_KEY` in Vercel Environment Variables → Deploy.

## Tech stack

React · Vite · Framer Motion · Recharts · Claude API (Haiku model)

## Folder structure

```
src/
  engine/      Game logic, financial formulas, events, win conditions
  screens/     One file per game phase screen
  components/  Reusable UI pieces (layout, decisions, charts)
  hooks/       useGame (state) and useClaudeDebrief (AI)
  styles/      Design tokens (theme.css) and global CSS
  utils/       Number formatters and round description data
```

## License

MIT
