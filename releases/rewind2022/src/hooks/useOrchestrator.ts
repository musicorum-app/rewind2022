import { Map } from 'immutable'
import create from 'zustand'
import { scenesStore } from '../scenes/scenes'
import { RewindScene, rewindScenes } from '../types'
import { useTimelineController } from './useTimelineController'

export enum LoadState {
  STARTUP = 1,
  RESOLVE = 2,
  PLAY = 3
}

export interface OrchestratorStore {
  state: LoadState
  setState: (state: LoadState) => void

  scene: RewindScene
  isTransitioning: boolean

  setIsTransitioning: (isTransitioning: boolean) => void
  next: () => void
  prev: () => void
}

export const useOrchestrator = create<OrchestratorStore>((set, get) => ({
  state: LoadState.STARTUP,
  setState: (state) => set({ state }),

  scene: RewindScene.YearSplash,
  isTransitioning: true,

  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  next: () => {
    if (get().isTransitioning) {
      return
    }

    const index = rewindScenes.indexOf(get().scene)
    const nextScene = rewindScenes[index + 1]
    if (!nextScene) {
      return
    }

    console.debug('Start transition')
    set({
      scene: nextScene,
      isTransitioning: true
    })

    const timelines = scenesStore.getState().timelines.get(nextScene)

    if (timelines?.forward) {
      const tl = timelines.forward.factory()
      useTimelineController.getState().setTimeline(tl)
      tl.play(0).then(() => {
        console.debug('Transition done')
        set({
          isTransitioning: false
        })
      })
    }
  },

  prev: () => {
    if (get().isTransitioning) {
      return
    }

    const index = rewindScenes.indexOf(get().scene)
    const currentScene = rewindScenes[index]
    const prevScene = rewindScenes[index - 1]
    if (!prevScene) {
      return
    }

    set({
      scene: prevScene,
      isTransitioning: true
    })

    const timelines = scenesStore.getState().timelines.get(currentScene)

    console.log(timelines)

    if (timelines?.backward) {
      const tl = timelines.backward.factory()
      useTimelineController.getState().setTimeline(tl)
      tl.play(0).then(() => {
        console.debug('Transition done')
        set({
          isTransitioning: false
        })
      })
    }
  }
}))

// @ts-expect-error global attribution
window.orchestrator = () => useOrchestrator.getState()
