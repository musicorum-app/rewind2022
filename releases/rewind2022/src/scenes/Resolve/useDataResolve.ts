import create from 'zustand'
import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'

export enum DataResolveStep {
  USER_INPUT,
  USER_CONFIRM
}

export interface DataResolveStore {
  step: DataResolveStep
  setStep: (step: DataResolveStep) => void
  user: LastfmUserInfo | null
  setUser: (user: LastfmUserInfo | null) => void
}

export const useDataResolve = create<DataResolveStore>((set) => ({
  step: DataResolveStep.USER_INPUT,
  setStep: (step) => set({ step }),

  user: null,
  setUser: (user) => set({ user })
}))
