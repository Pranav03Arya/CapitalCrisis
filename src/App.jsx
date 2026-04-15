import { AnimatePresence, motion } from 'framer-motion'
import { useGame } from './hooks/useGame.js'
import GameLayout     from './components/layout/GameLayout.jsx'
import LandingScreen  from './screens/LandingScreen.jsx'
import SetupScreen    from './screens/SetupScreen.jsx'
import BriefingScreen from './screens/BriefingScreen.jsx'
import DecisionScreen from './screens/DecisionScreen.jsx'
import EventScreen    from './screens/EventScreen.jsx'
import ResultsScreen  from './screens/ResultsScreen.jsx'
import LearnScreen    from './screens/LearnScreen.jsx'
import EndScreen      from './screens/EndScreen.jsx'

const SCREENS = { briefing: BriefingScreen, decision: DecisionScreen, event: EventScreen, results: ResultsScreen, learn: LearnScreen }
const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 } }
const Fade = ({ id, children }) => <motion.div key={id} variants={fade} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>{children}</motion.div>

export default function App() {
  const game = useGame()
  const { state, setPhase, startGame } = game
  const props = { state, ...game }

  if (state.phase === 'landing') return (
    <AnimatePresence mode="wait">
      <Fade id="landing"><LandingScreen {...props} onStart={() => setPhase('setup')} /></Fade>
    </AnimatePresence>
  )

  if (state.phase === 'setup') return (
    <AnimatePresence mode="wait">
      <Fade id="setup"><SetupScreen startGame={startGame} goBack={() => setPhase('landing')} /></Fade>
    </AnimatePresence>
  )

  const Screen = state.gameOver ? EndScreen : (SCREENS[state.phase] ?? BriefingScreen)
  return (
    <GameLayout state={state} game={game}>
      <AnimatePresence mode="wait">
        <Fade id={state.gameOver ? 'end' : state.phase}><Screen {...props} /></Fade>
      </AnimatePresence>
    </GameLayout>
  )
}
