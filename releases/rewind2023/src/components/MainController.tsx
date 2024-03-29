import { clearRewindDataCache } from '@rewind/resolver'
import TimelineTool from '@rewind/core/src/components/timeline/TimelineTool'
import { button, Leva, useControls } from 'leva'
import { useEffect } from 'react'
import { Portal } from 'react-portal'
import { LoadState, useOrchestrator } from '../hooks/useOrchestrator'
import { useTimelineController } from '../hooks/useTimelineController'
import { extractImageColor } from '../modules/image'
import {
  DataResolveStep,
  useDataResolve,
  useRewindData
} from '../scenes/Resolve/useDataResolve'
import { getClosestPalette } from '../modules/image/palette'
import { useBlade, useFolder, useMonitor } from '@rewind/toolkit'
import { ButtonGridApi } from '@tweakpane/plugin-essentials'
import { ButtonGridBladeParams } from '@tweakpane/plugin-essentials/dist/types/button-grid/plugin'
import {
  ButtonApi,
  ButtonBladeParams,
  ButtonParams,
  TextView
} from '@tweakpane/core'
import { TextBladeParams } from 'tweakpane'
import { lastfmClient } from '../modules/lastfm'

const levaElement = document.querySelector('#overlay')

export default function MainController() {
  const [
    loadState,
    isTransitioning,
    setIsTransitioning,
    setLoadState,
    prev,
    next,
    scene
  ] = useOrchestrator((s) => [
    s.state,
    s.isTransitioning,
    s.setIsTransitioning,
    s.setState,
    s.prev,
    s.next,
    s.scene
  ])

  const currentTimeline = useTimelineController((s) => s.currentTimeline)

  const clear = useDataResolve((s) => s.clear)

  const orchestratorFolder = useFolder({
    title: 'Orchestrator',
    index: 0
  })

  // const values = useControls(
  //   'Orchestrator',
  //   {
  //     loadState: {
  //       options: {
  //         Startup: LoadState.STARTUP,
  //         Resolve: LoadState.RESOLVE,
  //         Play: LoadState.PLAY
  //       },
  //       value: loadState
  //     },
  //     prev: button(() => prev()),
  //     next: button(() => next())
  //   },
  //   [loadState]
  // )

  useMonitor(
    scene,
    {
      view: 'text',
      label: 'scene',
      readonly: true
    },
    undefined,
    orchestratorFolder.current
  )

  useMonitor(
    isTransitioning,
    {
      view: 'boolean',
      label: 'is transitioning'
    },
    (blade) => {
      blade.on('change', (ev) => {
        setIsTransitioning(ev.value as boolean)
      })
    },
    orchestratorFolder.current
  )

  useBlade<ButtonGridApi, ButtonGridBladeParams>(
    {
      view: 'buttongrid',
      size: [2, 1],
      cells: (x: number) => ({
        title: ['<', '>'][x]
      }),
      label: 'control'
    },
    (blade) => {
      blade.on('click', (ev) => {
        if (ev.cell.title === '<') prev()
        else next()
      })
    },
    orchestratorFolder.current
  )

  useBlade<ButtonApi, ButtonBladeParams>(
    {
      view: 'button',
      title: 'Fast load',
      label: 'fast load'
    },
    (blade) =>
      blade.on('click', async () => {
        setLoadState(LoadState.RESOLVE)
        const user = await lastfmClient.user.getInfo('metye')
        useDataResolve.getState().setUser(user)
        useDataResolve.getState().setStep(DataResolveStep.LOADING)
        await useDataResolve.getState().resolve()
      }),
    orchestratorFolder.current
  )

  // useControls(
  //   'Timeline',
  //   {
  //     play: button(() => {
  //       currentTimeline?.play(0)
  //     })
  //   },
  //   {
  //     collapsed: true
  //   },
  //   [currentTimeline]
  // )

  // useControls('Data', {
  //   clearRewindCache: button(() => {
  //     clearRewindDataCache()
  //   }),
  //   resetUserData: button(() => {
  //     clear()
  //     setLoadState(LoadState.RESOLVE)
  //   })
  // })

  // const imagevalues = useControls(
  //   'Image color extractor',
  //   {
  //     image: { image: undefined }
  //   },
  //   {
  //     collapsed: true
  //   }
  // )

  // const refValues = useControls(
  //   'Reference objects',
  //   {
  //     showObjects: false
  //   },
  //   {
  //     collapsed: true
  //   }
  // )

  // useEffect(() => {
  //   if (imagevalues.image) {
  //     extractImageColor(imagevalues.image).then((color) => {
  //       if (color) {
  //         getClosestPalette(color)
  //       }
  //     })
  //   }
  // }, [imagevalues.image])

  useEffect(() => {
    if (isTransitioning) {
      console.info('Started transition')
    } else {
      console.info('Ended transition')
    }
  }, [isTransitioning])

  // useEffect(() => {
  //   setLoadState(values.loadState)
  // }, [values.loadState])

  // useEffect(() => {
  //   const objects = document.querySelectorAll<HTMLElement>(
  //     '.positioned-ref-obj'
  //   )
  //   for (const object of objects) {
  //     object.style.opacity = refValues.showObjects ? '1' : '0'
  //     object.style.borderWidth = refValues.showObjects ? '2px' : '0'
  //   }
  // }, [refValues.showObjects])

  return (
    <Portal node={levaElement}>
      <TimelineTool
        timeline={currentTimeline}
        canNavigate={!isTransitioning}
        prev={prev}
        next={next}
      />
    </Portal>
  )
}
