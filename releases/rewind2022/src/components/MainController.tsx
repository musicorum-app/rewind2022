import { clearRewindDataCache } from '@rewind/resolver'
import { button, Leva, useControls } from 'leva'
import { useEffect } from 'react'
import { Portal } from 'react-portal'
import { LoadState, useOrchestrator } from '../hooks/useOrchestrator'
import { useTimelineController } from '../hooks/useTimelineController'
import { extractImageColor } from '../modules/image'
import { getClosestPalette } from '../modules/rewindDataExtras'
import { useDataResolve, useRewindData } from '../scenes/Resolve/useDataResolve'

const levaElement = document.querySelector('#overlay')

export default function MainController() {
  const [loadState, setLoadState, prev, next] = useOrchestrator((s) => [
    s.state,
    s.setState,
    s.prev,
    s.next
  ])

  const currentTimeline = useTimelineController((s) => s.currentTimeline)

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
      prev: button(() => prev()),
      next: button(() => next())
    },
    [loadState]
  )

  useControls(
    'Timeline',
    {
      play: button(() => {
        currentTimeline?.play(0)
      })
    },
    [currentTimeline]
  )

  useControls('Data', {
    clearRewindCache: button(() => {
      clearRewindDataCache()
    }),
    resetUserData: button(() => {
      clear()
      setLoadState(LoadState.RESOLVE)
    })
  })

  const imagevalues = useControls('Image color extractor', {
    image: { image: undefined }
  })

  const refValues = useControls('Reference objects', {
    showObjects: false
  })

  useEffect(() => {
    if (imagevalues.image) {
      extractImageColor(imagevalues.image).then((color) => {
        if (color) {
          getClosestPalette(color)
        }
      })
    }
  }, [imagevalues.image])

  useEffect(() => {
    setLoadState(values.loadState)
  }, [values.loadState])

  useEffect(() => {
    const objects = document.querySelectorAll<HTMLElement>(
      '.positioned-ref-obj'
    )
    for (const object of objects) {
      object.style.opacity = refValues.showObjects ? '1' : '0'
    }
  }, [refValues.showObjects])

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
        collapsed={true}
      />
    </Portal>
  )
}
