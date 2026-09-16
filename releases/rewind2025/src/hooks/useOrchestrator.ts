import { Map } from 'immutable'
import create from 'zustand'
import { scenesStore } from '../scenes/scenes'
import { RewindScene, rewindScenes } from '../types'
import { usePlayer } from './usePlayer'
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

    const timelines = scenesStore.getState().timelines.get(nextScene)

    if (timelines?.forward) {
      set({
        scene: nextScene,
        isTransitioning: true
      })
      const tl = timelines.forward.factory()
      useTimelineController.getState().setTimeline(tl)
      tl.play(0).then(() => {
        console.debug('Transition done')
        set({
          isTransitioning: false
        })
      })
      const { playAudio } = usePlayer.getState()
      playAudio(nextScene)
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

    const timelines = scenesStore.getState().timelines.get(currentScene)

    if (timelines?.backward) {
      set({
        scene: prevScene,
        isTransitioning: true
      })
      const tl = timelines.backward.factory()
      useTimelineController.getState().setTimeline(tl)
      tl.play(0).then(() => {
        console.debug('Transition done')
        set({
          isTransitioning: false
        })
      })
      const { playAudio } = usePlayer.getState()
      playAudio(prevScene)
    }
  }
}))

// @ts-expect-error global attribution
window.orchestrator = () => useOrchestrator.getState()
