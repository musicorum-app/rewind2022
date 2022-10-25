import create from 'zustand'
import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'
import { resolveRewindData } from '@rewind/resolver'
import { lastfmClient } from '../../modules/lastfm'

export enum DataResolveStep {
  USER_INPUT,
  USER_CONFIRM
}

export interface DataResolveStore {
  step: DataResolveStep
  setStep: (step: DataResolveStep) => void

  error: string | null
  setError: (error: string | null) => void

  user: LastfmUserInfo | null
  setUser: (user: LastfmUserInfo | null) => void

  resolve: () => void
}

export const useDataResolve = create<DataResolveStore>((set, get) => ({
  step: DataResolveStep.USER_INPUT,
  setStep: (step) => set({ step }),

  error: null,
  setError: (error) => set({ error }),

  user: null,
  setUser: (user) => set({ user }),

  resolve: async () => {
    const user = get().user
    if (!user) {
      return set({ error: 'User is not defined' })
    }

    await resolveRewindData(user, lastfmClient, (status) => {
      console.log(status)
    })
  }
}))
