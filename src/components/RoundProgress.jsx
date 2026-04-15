import { motion } from 'framer-motion'

export default function RoundProgress({ round }) {
  return (
    <div style={{ background: 'var(--bg-surface)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {Array.from({ length: 6 }, (_, i) => {
        const num     = i + 1
        const done    = num < round
        const current = num === round
        return (
          <div key={num} style={{ display: 'flex', alignItems: 'center' }}>
            {i > 0 && (
              <div style={{
                width: 48, height: 2, transition: 'background 0.4s',
                background: done ? 'var(--accent-green)' : 'var(--border)',
              }} />
            )}
            <motion.div
              animate={current ? { scale: [1, 1.14, 1] } : { scale: 1 }}
              transition={current ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : {}}
              style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 600,
                transition: 'background 0.4s, border 0.4s, color 0.4s',
                background: done    ? 'var(--accent-green)' : 'transparent',
                border:     current ? '2px solid var(--accent-green)' : done ? 'none' : '1px solid var(--border)',
                color:      done    ? '#fff' : current ? 'var(--accent-green)' : 'var(--text-muted)',
              }}
            >
              {num}
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
