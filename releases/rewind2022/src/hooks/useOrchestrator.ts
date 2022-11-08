import create from 'zustand'

export enum LoadState {
  STARTUP = 1,
  RESOLVE = 2,
  PLAY = 3
}

export interface OrchestratorStore {
  state: LoadState
  setState: (state: LoadState) => void

  scene: number
  isTransitioning: boolean

  setIsTransitioning: (isTransitioning: boolean) => void
  next: () => void
  prev: () => void
}

export const useOrchestrator = create<OrchestratorStore>((set, get) => ({
  state: LoadState.STARTUP,
  setState: (state) => set({ state }),

  scene: 0,
  isTransitioning: true,

  setIsTransitioning: (isTransitioning) => set({ isTransitioning }),
  next: () => {
    if (get().isTransitioning) {
      return
    }

    set({
      scene: get().scene + 1,
      isTransitioning: true
    })
  },

  prev: () => {
    if (get().isTransitioning) {
      return
    }

    set({
      scene: get().scene + 1,
      isTransitioning: true
    })
  }
}))
