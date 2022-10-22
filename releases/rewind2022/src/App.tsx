import { useEffect } from 'react'
import SplashScene from './scenes/Splash/SplashScene'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/800.css'
import './App.css'
import { LoadState, useOrchestrator } from './hooks/useOrchestrator'
import ResolveScene from './scenes/Resolve/ResolveScene'
import { useTweaks } from 'use-tweaks'

export default function App() {
  return <StateDisplay />
}

function StateDisplay() {
  const orchestrator = useOrchestrator()

  if (orchestrator.state === LoadState.STARTUP) {
    return <SplashScene />
  } else if (orchestrator.state === LoadState.RESOLVE) {
    return <ResolveScene />
  }

  return null
}
