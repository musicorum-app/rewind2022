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
import {
  RewindData2022,
  sanitizeRewindData
} from '../../modules/rewindDataExtras'
import { RewindCache } from '../../types'
import { RewindData } from '@rewind/resolver/src/types'

export enum DataResolveStep {
  USER_INPUT,
  USER_CONFIRM,
  LOADING,
  DONE
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

  rewindData: RewindData2022 | null
  resolve: () => void

  clear: () => void
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

  clear: () => {
    set({
      user: null,
      rewindData: null,
      step: DataResolveStep.USER_INPUT
    })
  },

  rewindData: null,
  resolve: async () => {
    const user = get().user
    if (!user) {
      return set({ error: 'User is not defined' })
    }

    set({ step: DataResolveStep.LOADING })

    try {
      const cached = localStorage.getItem('Rewind22Cache')

      let data: RewindData | null = null

      try {
        if (cached) {
          const parsed = JSON.parse(cached) as RewindCache
          if (
            parsed &&
            parsed.version &&
            parsed.version === import.meta.env.VITE_CACHE_VERSION
          ) {
            data = parsed.data
          }
        }
      } catch (err) {
        console.warn('Could not get cache data:', err)
      }

      if (!data) {
        data = await resolveRewindData(user, lastfmClient, (loadingStatus) => {
          set({ loadingStatus })
        })

        localStorage.setItem(
          'Rewind22Cache',
          JSON.stringify({
            data,
            version: import.meta.env.VITE_CACHE_VERSION
          } as RewindCache)
        )
      }

      const rewindData = await sanitizeRewindData(data, user)

      if (import.meta.env.DEV) {
        // @ts-expect-error force global var
        window.rewindData = rewindData
        console.log('rewind data done')
      }

      set({ rewindData, step: DataResolveStep.DONE })
    } catch (err) {
      if (err instanceof LastfmError) {
        console.log('lfm error', err.error)
        if (err.error === LastfmErrorCode.REQUIRES_LOGIN) {
          return set({ error: 'errors.private_scrobbles' })
        } else if (err.error === LastfmErrorCode.RATE_LIMIT_EXCEEDED) {
          return set({ error: 'errors.rate_limit' })
        }
      }
      set({ error: 'errors.generic' })
      alert(err)
      console.error(err)
    }
  }
}))

export function useRewindData() {
  const rewindData = useDataResolve((s) => s.rewindData)

  return rewindData
}
