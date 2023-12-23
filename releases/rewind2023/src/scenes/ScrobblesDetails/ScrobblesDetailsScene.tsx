import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { Trans, useTranslation } from 'react-i18next'
import { useRewindData } from '../Resolve/useDataResolve'
import {
  FiArrowUp,
  FiArrowDown,
  FiMinus,
  FiMusic,
  FiCalendar,
  FiStar
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import DetailItem from './DetailItem'
import { useEffect } from 'react'
import { scenesStore } from '../scenes'
import { RewindScene } from '../../types'
import {
  createScrobblesDetailsTimelineBackward,
  createScrobblesDetailsTimelineForward
} from './scrobbleDetailsTimeline'
import { useSceneAudio } from '../../hooks/useSceneAudio'
import { Palettes } from '../../theme/colors'

const LastYearLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;

  & b {
    font-variation-settings: 'wght' 700;
    margin-left: 3px;
    margin-right: 3px;
  }
`

const LastYearIcon = styled.div<{ color: string }>`
  background: white;
  border-radius: 24px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

  & svg {
    width: 70%;
    height: 70%;
    stroke: ${(p) => p.color};
  }
`

const Digit = styled.span`
  font-size: 0.7em;
  font-variation-settings: 'wght' 900;
  margin: 0;
  line-height: 0.7em;
  width: 60px;
  display: flex;
  justify-content: center;
  color: ${Palettes.Candy.color};

  @media only screen and (max-width: 700px) {
    width: 40px;
  }

  @media only screen and (max-width: 460px) {
    width: 30px;
  }
`

const CountContainer = styled.div`
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 100px;

  @media only screen and (max-width: 1030px) {
    top: 60px;
  }
  @media only screen and (max-height: 730px) {
    top: 60px;
  }

  font-size: 182px;

  @media only screen and (max-width: 700px) {
    font-size: 120px;
  }

  @media only screen and (max-width: 460px) {
    font-size: 90px;
  }
`

const CountCopy = styled(Digit)`
  display: flex;
  width: auto !important;
`

const ComplementaryText = styled.h2`
  font-size: 20px;
  margin: 0;
  margin-bottom: 1rem;
  text-align: center;
`

const Details = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: calc(var(--margin) * 2);
  margin-top: 70px;
  width: 100%;
  box-sizing: border-box;
  padding: calc(26px * 2);
  position: absolute;
  top: calc(100px + 100px);

  & > div {
    opacity: 0;
  }

  @media only screen and (max-width: 1030px) {
    flex-direction: column;
    margin-top: 40px;
    gap: 18px;
    top: calc(100px + 20px);
  }

  @media only screen and (max-width: 700px) {
    top: calc(100px);
  }
`

const icons: Record<DifferenceType, IconType> = {
  less: FiArrowDown,
  same: FiMinus,
  more: FiArrowUp
}

const colors: Record<DifferenceType, string> = {
  less: '#CA2B2B',
  same: '#2723E1',
  more: '#10BD89'
}

export default function ScrobblesDetailsScene() {
  const rewindData = useRewindData()
  const setTimelines = scenesStore((s) => s.setTimelines)

  const { t } = useTranslation()

  useSceneAudio(
    RewindScene.ScrobblesDetailsScene,
    rewindData?.tracks.resources[8].preview,
    rewindData?.tracks.resources[8].name
  )

  useEffect(() => {
    setTimelines(RewindScene.ScrobblesDetailsScene, {
      forward: {
        id: 'scd-forward',
        factory: createScrobblesDetailsTimelineForward
      },
      backward: {
        id: 'scd-backward',
        factory: createScrobblesDetailsTimelineBackward
      }
    })
  }, [])

  if (!rewindData) {
    return null
  }

  const lastYearTotal = rewindData.scrobbles.lastYearTotal

  const lastYearDiff = rewindData.scrobbles.total - lastYearTotal

  const diffType = getByDifferenceType(lastYearDiff)

  const Icon = icons[diffType]
  const color = colors[diffType]

  const streak = rewindData.scrobbles.biggestStreak

  const percentDiff = Math.round(rewindData.scrobbles.lastYearPercentDiff)
  const percentDiffString =
    percentDiff > 0 ? '+' + percentDiff : percentDiff.toString()

  return (
    <Centered column id="scd">
      <CountContainer className="info">
        <CountCopy>
          {rewindData.scrobbles.total
            .toString()
            .split('')
            .map((d) => (
              <Digit>{d}</Digit>
            ))}
        </CountCopy>
        <ComplementaryText>scrobbles this year</ComplementaryText>

        <LastYearLabel className="label">
          <LastYearIcon color={color}>
            <Icon />
          </LastYearIcon>
          <Trans
            i18nKey={`scrobbles_details.last_year_${
              diffType === 'same' ? 'same' : 'diff'
            }`}
            count={Math.abs(lastYearTotal)}
            values={{
              percent: percentDiffString
            }}
            components={[<b></b>]}
          />
        </LastYearLabel>
      </CountContainer>

      <Details className="details">
        <DetailItem
          label={t('scrobbles_details.details.average.label')}
          title={t('scrobbles_details.details.average.title', {
            count: Math.round(rewindData.scrobbles.dailyAverage)
          })}
          secondary={t('scrobbles_details.details.average.secondary')}
        >
          <FiMusic />
        </DetailItem>

        <DetailItem
          label={t('scrobbles_details.details.streak.label')}
          title={t('scrobbles_details.details.streak.title', {
            count: Math.round(streak.daysCount)
          })}
          secondary={t('scrobbles_details.details.streak.secondary', {
            from: new Date(streak.from),
            to: new Date(streak.to),
            formatParams: {
              from: {
                month: 'short',
                day: 'numeric'
              },
              to: {
                month: 'short',
                day: 'numeric'
              }
            }
          })}
        >
          <FiCalendar />
        </DetailItem>

        <DetailItem
          label={t('scrobbles_details.details.golden_day.label')}
          title={t('scrobbles_details.details.golden_day.title', {
            count: rewindData.scrobbles.goldenDay.count
          })}
          secondary={t('scrobbles_details.details.golden_day.secondary', {
            date: new Date(rewindData.scrobbles.goldenDay.date),
            formatParams: {
              date: {
                month: 'short',
                day: 'numeric'
              }
            }
          })}
        >
          <FiStar />
        </DetailItem>
      </Details>
    </Centered>
  )
}

type DifferenceType = 'more' | 'less' | 'same'

function getByDifferenceType(diff: number): DifferenceType {
  if (diff > 0) {
    return 'more'
  } else if (diff === 0) {
    return 'same'
  } else {
    return 'less'
  }
}
