import GameHeader from './GameHeader.jsx'
import GameSidebar from './GameSidebar.jsx'

export default function GameLayout({ state, game, children }) {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', overflowX: 'hidden', background: 'var(--bg-page)' }}>
      <GameHeader round={state.round} phase={state.phase} tickerSymbol={state.tickerSymbol} />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', paddingTop: 'var(--header-height)' }}>
        <div style={{ width: 'var(--sidebar-width)', flexShrink: 0 }}>
          <GameSidebar state={state} />
        </div>
        <main style={{ flex: 1, minWidth: 0, padding: '24px', overflowY: 'auto', minHeight: 'calc(100vh - var(--header-height))' }}>
          {children}
        </main>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .sidebar-hide { display: none !important; }
          .main-full    { margin-left: 0 !important; width: 100% !important; }
        }
      `}</style>
    </div>
  )
}
