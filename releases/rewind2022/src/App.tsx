import SplashScene from './scenes/Splash/SplashScene'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/variable.css'
import './App.css'
import { LoadState, useOrchestrator } from './hooks/useOrchestrator'
import ResolveScene from './scenes/Resolve/ResolveScene'
import './locales/i18n'
import Overlay from './components/Overlay'
import { lazy } from 'react'
import SceneOrchestrator from './components/SceneOrchestrator'

const isDev = import.meta.env.DEV
const MainControls = lazy(() => import('./components/MainController'))

export default function App() {
  return (
    <>
      <StateDisplay />
      <Overlay />
      {isDev && <MainControls />}
    </>
  )
}

function StateDisplay() {
  const orchestrator = useOrchestrator()

  if (orchestrator.state === LoadState.STARTUP) {
    return <SplashScene />
  } else if (orchestrator.state === LoadState.RESOLVE) {
    return <ResolveScene />
  } else if (orchestrator.state === LoadState.PLAY) {
    return <SceneOrchestrator />
  }

  return null
}
