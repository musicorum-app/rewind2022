import { clearRewindDataCache } from '@rewind/resolver'
import { button, Leva, useControls } from 'leva'
import { useEffect } from 'react'
import { Portal } from 'react-portal'
import { LoadState, useOrchestrator } from '../hooks/useOrchestrator'
import { useDataResolve, useRewindData } from '../scenes/Resolve/useDataResolve'

const levaElement = document.querySelector('#overlay')

export default function MainController() {
  const [loadState, setLoadState] = useOrchestrator((s) => [
    s.state,
    s.setState
  ])

  const clear = useDataResolve((s) => s.clear)

  const values = useControls(
    'Orchestrator',
    {
      loadState: {
        options: {
          Startup: LoadState.STARTUP,
          Resolve: LoadState.RESOLVE,
          Play: LoadState.PLAY
        },
        value: loadState
      },
      clearRewindCache: button(() => {
        clearRewindDataCache()
      }),
      resetUserData: button(() => {
        clear()
        setLoadState(LoadState.RESOLVE)
      })
    },
    [loadState]
  )

  console.log(loadState, values.loadState)

  useEffect(() => {
    setLoadState(values.loadState)
  }, [values.loadState])

  return (
    <Portal node={levaElement}>
      <Leva
        theme={{
          fontWeights: {
            folder: '600'
          },
          fontSizes: {
            root: '13px'
          }
        }}
      />
    </Portal>
  )
}
