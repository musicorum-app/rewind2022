import { LastfmUserInfo } from '@musicorum/lastfm/dist/types/packages/user'
import LastClient from '@musicorum/lastfm'

const from = new Date('2022-01-01 00:00')
const to = new Date('2022-12-31 23:59')

export enum ResolveStep {
  STARTUP,
  FETCHING_PAGES,
  FETCHING_RESOURCES,
  FINALIZING
}

export interface StatusUpdatePayload {
  step: ResolveStep,
  stepNumber?: number
  maxSteps?: number
}

export async function resolve(
  user: LastfmUserInfo,
  lastClient: LastClient,
  statusCallback: (status: StatusUpdatePayload) => void
) {
  statusCallback({
    step: ResolveStep.STARTUP
  })
  const recentTracks = await lastClient.user.getRecentTracksPaginated(
    user.name,
    {
      from,
      to,
      extended: true,
      limit: 1000
    }
  )

  for (let i = 2; i < recentTracks.totalPages; i++) {
    statusCallback({
      step: ResolveStep.FETCHING_PAGES,
      stepNumber: i - 1,
      maxSteps: recentTracks.totalPages - 1
    })
    await recentTracks.fetchPage(i)
  }

  statusCallback({
    step: ResolveStep.FETCHING_RESOURCES,
  })

  const topTracks = 
}