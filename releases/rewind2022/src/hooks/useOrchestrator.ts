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

export const useOrchestrator = create<OrchestratorStore>((set) => ({
  state: getInitialState(),
  setState: (state) => set({ state })
}))

function getInitialState() {
  if (import.meta.env.PROD) {
    return LoadState.STARTUP
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ls = parseInt(localStorage.getItem('RewindSavedLoadState')!)

  return ls && Object.values(LoadState).includes(ls)
    ? (ls as unknown as LoadState)
    : LoadState.STARTUP
}
