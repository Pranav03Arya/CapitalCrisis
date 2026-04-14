export default function GameHeader({ round, phase, tickerSymbol }) {
  const showRound  = phase && phase !== 'landing'
  const showTicker = tickerSymbol && tickerSymbol !== 'CPCR'

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 'var(--header-height)', background: 'var(--bg-header)',
      borderBottom: '1px solid var(--border)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {showTicker ? (
          <>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--blue)' }}>{tickerSymbol}</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{'\u00B7'} Capital Crisis</span>
          </>
        ) : (
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>Capital Crisis</span>
        )}
      </div>

      {showRound && (
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--blue)', fontSize: '0.9rem' }}>
          Round {round} of 6
        </span>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 0, padding: 4 }} title="Help">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5" fill="currentColor"/>
          </svg>
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 0, padding: 4 }} title="Settings">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>
    </header>
  )
}
