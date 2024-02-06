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
  RewindData2023,
  sanitizeRewindData
} from '../../modules/rewindDataExtras'
import { RewindCache } from '../../types'
import { RewindData } from '@rewind/resolver/src/types'
import * as Sentry from '@sentry/react'

let from = new Date('2023-01-01T00:00')
let to = new Date('2023-12-31T23:59')

const fromLimit = 1672488000000 // 2022-12-31T12:00:00.000Z
const toLimit = 1704110400000 // 2024-01-01T12:00:00.000Z

if (isNaN(from.getTime()) || from.getTime() < fromLimit) {
  from = new Date(1672531200000) // 2023-01-01T00:00:00.000Z
}

if (isNaN(to.getTime()) || to.getTime() > toLimit) {
  to = new Date(1704067140000) // 2023-12-31T23:59:00.000Z
}

export enum DataResolveStep {
  USER_INPUT,
  USER_CONFIRM,
  LOADING,
  CACHE_CONFIRM,
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

  rewindData: RewindData2023 | null
  resolve: () => Promise<void>

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
      const cached = localStorage.getItem('Rewind23Cache')

      let data: RewindData | null = null
      let fromCached = false

      try {
        if (cached) {
          const parsed = JSON.parse(cached) as RewindCache
          if (
            parsed &&
            parsed.version &&
            parsed.version === import.meta.env.VITE_CACHE_VERSION &&
            parsed.data.user === user.name
          ) {
            data = parsed.data
            fromCached = true
          }
        }
      } catch (err) {
        console.warn('Could not get cache data:', err)
      }

      if (!data) {
        data = await resolveRewindData(
          from,
          to,
          user,
          lastfmClient,
          (loadingStatus) => {
            set({ loadingStatus })
          }
        )

        localStorage.setItem(
          'Rewind23Cache',
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

      const nextStep = fromCached
        ? DataResolveStep.CACHE_CONFIRM
        : DataResolveStep.DONE

      set({ rewindData, step: nextStep })
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
      Sentry.captureException(err)
      console.error(err)
    }
  }
}))

export function useRewindData() {
  const rewindData = useDataResolve((s) => s.rewindData)

  return rewindData
}
