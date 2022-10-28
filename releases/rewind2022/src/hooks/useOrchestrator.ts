import create from 'zustand'

export enum LoadState {
  STARTUP,
  RESOLVE,
  PLAY
}

export interface OrchestratorStore {
  state: LoadState
  setState: (state: LoadState) => void
}

const initialState = import.meta.env.DEV ? LoadState.STARTUP : LoadState.STARTUP

export const useOrchestrator = create<OrchestratorStore>((set) => ({
  state: initialState,
  setState: (state) => set({ state })
}))
