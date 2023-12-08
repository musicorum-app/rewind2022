import SplashScene from './scenes/Splash/SplashScene'
import ResolveScene from './scenes/Resolve/ResolveScene'
import { LoadState, useOrchestrator } from './hooks/useOrchestrator'
import './locales/i18n'
import Overlay from './components/Overlay'
import { lazy, useEffect, useState } from 'react'
import SceneOrchestrator from './components/SceneOrchestrator'

import './satoshi.css'
import './App.css'
import GlobalHeight from '@rewind/core/src/components/GlobalHeight'
import Dialog from './components/Dialog'
import { ToolkitProvider } from '@rewind/toolkit'
import MainController from './components/MainController'

const isDev = import.meta.env.DEV
// const MainControls = lazy(() => import('./components/MainController'))

export default function App() {
  const [firefoxDialog, setFirefoxDialog] = useState(false)

  useEffect(() => {
    if (window.navigator.userAgent.match(/firefox|fxios/i)) {
      setFirefoxDialog(true)
    }
  }, [])

  return (
    <>
      <ToolkitProvider>
        <GlobalHeight />
        <StateDisplay />
        <Overlay />
        {/* {isDev && <MainControls />} */}
        <MainController />
        <Dialog open={firefoxDialog} onClose={() => setFirefoxDialog(false)}>
          <p
            style={{
              margin: 18
            }}
          >
            There are some weird known issues with firefox not working for this
            website, please try another browser for now
          </p>
        </Dialog>
      </ToolkitProvider>
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
