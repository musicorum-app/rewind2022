import create from 'zustand'
import { mainSheet, sceneTimings } from '../scenes/scenes'
import { RewindScene, rewindScenes } from '../types'

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

    mainSheet.sequence
      .play({
        range: sceneTimings[nextScene].forward
      })
      .then(() => {
        console.debug('Transition done')
        set({
          isTransitioning: false
        })
      })
  },

  prev: () => {
    if (get().isTransitioning) {
      return
    }

    const index = rewindScenes.indexOf(get().scene)
    const prevScene = rewindScenes[index - 1]
    if (!prevScene) {
      return
    }

    console.debug('Start transition', sceneTimings[prevScene].back)
    set({
      scene: prevScene,
      isTransitioning: true
    })

    mainSheet.sequence
      .play({
        range: sceneTimings[prevScene].back
      })
      .then(() => {
        console.debug('Transition done')
        set({
          isTransitioning: false
        })
      })
  }
}))
