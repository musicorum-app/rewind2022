import create from 'zustand'
import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'
import {
  resolveRewindData,
  ResolveStep,
  StatusUpdatePayload
} from '@rewind/resolver'
import { lastfmClient } from '../../modules/lastfm'
import {
  LastfmError,
  LastfmErrorCode
} from '@musicorum/lastfm/dist/error/LastfmError'

export enum DataResolveStep {
  USER_INPUT,
  USER_CONFIRM,
  LOADING
}

export interface DataResolveStore {
  step: DataResolveStep
  setStep: (step: DataResolveStep) => void

  loadingStatus: StatusUpdatePayload
  setLoadingStatus: (loadingStatus: StatusUpdatePayload) => void

  error: string | null
  setError: (error: string | null) => void

  user: LastfmUserInfo | null
  setUser: (user: LastfmUserInfo | null) => void

  resolve: () => void
}

export const useDataResolve = create<DataResolveStore>((set, get) => ({
  step: DataResolveStep.USER_INPUT,
  setStep: (step) => set({ step }),

  loadingStatus: {
    step: ResolveStep.STARTUP
  },
  setLoadingStatus: (loadingStatus) => set({ loadingStatus }),

  error: null,
  setError: (error) => set({ error }),

  user: null,
  setUser: (user) => set({ user }),

  resolve: async () => {
    const user = get().user
    if (!user) {
      return set({ error: 'User is not defined' })
    }

    set({ step: DataResolveStep.LOADING })

    try {
      await resolveRewindData(user, lastfmClient, (loadingStatus) => {
        set({ loadingStatus })
      })
    } catch (err) {
      if (err instanceof LastfmError) {
        console.log(err.error)
        if (err.error === LastfmErrorCode.REQUIRES_LOGIN) {
          set({ error: 'errors.private_scrobbles' })
        } else if (err.error === LastfmErrorCode.RATE_LIMIT_EXCEEDED) {
          set({ error: 'errors.rate_limit' })
        }
      }
      console.error(err)
    }
  }
}))
