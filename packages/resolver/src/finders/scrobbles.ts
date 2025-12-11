import { LastfmRecentTracksResponse } from '@musicorum/lastfm/dist/types/packages/user'
import { Month, RewindData, ScrobblesData, Track } from '../types'
import { months as monthList } from '../types'
import { aggregate, sortMapWithArray } from '../utils'
import 'core-js/features/array/at'

export function parseScrobbles(
  recentTracks: Track[],
  lastYear: LastfmRecentTracksResponse<false>
): ScrobblesData {
  const months = {} as Record<Month, number>

  const aggregatedByMonth = aggregate(recentTracks, (track) => {
    return track.date ? monthList[new Date(track.date).getMonth()] : 'none'
  })

  for (const month of monthList) {
    months[month] = aggregatedByMonth.get(month)?.length ?? 0
    console.log(month + ':', months[month])
  }

  const aggregatedByDate = aggregate(recentTracks, (track) => {
    if (!track.date) return 'none'
    const date = new Date(track.date)
    return `${date.getMonth()}-${date.getDate()}`
  })

  const goldenDay = sortMapWithArray(aggregatedByDate)[0]
  const goldenDayDate = goldenDay.find((t) => !!t.date)

  const total = recentTracks.length
  const lastYearTotal = parseInt(lastYear.attr.total)

  const percent = (total / lastYearTotal - 1) * 100

  return {
    total,
    lastYearTotal,
    lastYearPercentDiff: percent,
    dailyAverage: recentTracks.length / 365,
    goldenDay: {
      count: goldenDay.length,
      date: new Date(goldenDayDate!.date!).getTime()
    },
    biggestStreak: calculateStreak(recentTracks),
    months
  }
}

function calculateStreak(
  recentTracks: Track[]
): ScrobblesData['biggestStreak'] {
  const history = [...recentTracks].reverse()

  let biggestStreak: Track[] = []
  let streak: Track[] = []
  let lastDate = new Date(history.find((t) => !!t.date)?.date || 1672488000000)

  for (const track of history) {
    if (!track.date) {
      continue
    }
    if (!streak.length) {
      streak.push(track)
      continue
    }
    const trackDate = new Date(track.date)
    if (compareDate(trackDate, lastDate)) {
      continue
    }
    const date = new Date(lastDate)
    date.setDate(date.getDate() + 1)
    lastDate = trackDate
    if (compareDate(trackDate, date)) {
      streak.push(track)
    } else {
      if (streak.length > biggestStreak.length) {
        biggestStreak = streak
      }
      streak = []
    }
  }

  if (streak.length > biggestStreak.length) {
    biggestStreak = streak
  }

  return {
    daysCount: biggestStreak.length,
    from: new Date(biggestStreak[0].date!).getTime(),
    to: new Date(biggestStreak.at(-1)!.date!).getTime()
  }
}

function compareDate(a: Date, b: Date) {
  return a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}
