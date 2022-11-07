import create from 'zustand'

export enum LoadState {
  STARTUP = 1,
  RESOLVE = 2,
  PLAY = 3
}

export interface OrchestratorStore {
  state: LoadState
  setState: (state: LoadState) => void
}

export const useOrchestrator = create<OrchestratorStore>((set) => ({
  state: LoadState.STARTUP,
  setState: (state) => set({ state })
}))
