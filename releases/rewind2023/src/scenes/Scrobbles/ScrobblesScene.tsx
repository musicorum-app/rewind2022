import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import Stack from '@rewind/core/src/components/Stack'
import { useRewindData } from '../Resolve/useDataResolve'
import { useEffect, useMemo } from 'react'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { PaletteType, Palettes } from '../../theme/colors'
import { RewindScene } from '../../types'
import {
  scrobblesBackwardTimeline,
  scrobblesForwardTimeline
} from './scrobblesTimeline'
import { scenesStore } from '../scenes'
import Flex from '@react-css/flex'
import { useTranslation } from 'react-i18next'
import { useSceneAudio } from '../../hooks/useSceneAudio'
import 'core-js/features/array/at'
import { usePaletteToolkit } from '../../hooks/usePaletteToolkit'

const Container = styled(Centered)`
  font-size: 182px;
  @media only screen and (max-width: 700px) {
    font-size: 120px;
  }

  @media only screen and (max-width: 460px) {
    font-size: 90px;
  }
`

/**
 *    | 9 | 9 | 8
 *    | 9 | 9 | 9
 *  1 | 0 | 0 | 0
 *
 * ```ts
 * let exampleArr = [
 *  [' ', ' ', '1'],
 *  ['9', '9', '0'],
 *  ['9', '9', '0'],
 *  ['8', '9', '0']
 * ]
 * ```
 */
type ScrobbleListMap = string[][]

const ScrobbleListContainer = styled(Centered)`
  mask-image: linear-gradient(
    transparent calc(50% - 15rem),
    black calc(50% - 6rem),
    black calc(50% + 6rem),
    transparent calc(50% + 15rem)
  );
`

const ScrobbleList = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  align-items: flex-end;
  bottom: 0;
  padding-bottom: calc(var(--vh) * 50 - 0.5em);

  /* ; */
`

const Line = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-10em);
`

const Digit = styled.h1<{ color?: string }>`
  font-size: 1em;
  font-variation-settings: 'wght' 900;
  margin: 0;
  line-height: 1em;
  width: 115px;
  display: flex;
  justify-content: center;
  color: ${(p) => p.color ?? 'inherit'};

  @media only screen and (max-width: 700px) {
    width: 78px;
  }

  @media only screen and (max-width: 460px) {
    width: 58px;
  }
`

const CountCopy = styled(Digit)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-50% + 9px));
  display: flex;
  width: auto !important;
  background: var(--scene-main-color);
  color: var(--scene-darker-color);
  clip-path: inset(0 0 0 var(--scrobble-clip, 100%));
  padding: 0 10px;
`

const TextsCentered = styled(Centered)`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 6px;

  & ${Digit} {
    font-size: 1.05em;
  }

  & > div {
    display: flex;
  }
`

const ComplementaryText = styled.h2`
  text-shadow: 0px 3px 20px #00000099;
  font-size: 20px;
  margin: 0;
  opacity: 0;

  @media only screen and (max-width: 700px) {
    font-size: 18px;
  }
`

export default function ScrobblesScene() {
  const rewindData = useRewindData()
  const setTimelines = scenesStore((s) => s.setTimelines)

  const { t } = useTranslation()

  const scrobblesList = useMemo(() => {
    if (!rewindData) return null
    // dont even try to understand, this just do some cool number things
    const list = new Array(12)
      .fill(1)
      .map((_, i) => rewindData.scrobbles.total - i)

    const length = list.at(-1)!.toString().length
    const lines: ScrobbleListMap = new Array(length)
      .fill([])
      .map(() => new Array(list.length).fill(' '))

    for (let i = 0; i < list.length; i++) {
      const count = list[i].toString().padStart(length, ' ')
      const indexLimit = count.length - 2
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j]
        line[i] = i + j <= indexLimit ? ' ' : count[j]
      }
    }

    return lines
  }, [rewindData])

  const originPalette = useMemo(() => {
    const targetPalette = rewindData?.firstScrobbles.items[0].image.palette
    return targetPalette ? Palettes[targetPalette] : Palettes.Chuu
  }, [rewindData])

  const paletteType = usePaletteToolkit(RewindScene.Scrobbles, PaletteType.Chuu)
  const palette = Palettes[paletteType]

  useEffect(() => {
    setTimelines(RewindScene.Scrobbles, {
      forward: {
        id: 'scr-forward',
        factory: () => scrobblesForwardTimeline(originPalette, palette)
      },
      backward: {
        id: 'scr-backward',
        factory: () => scrobblesBackwardTimeline(originPalette, palette)
      }
    })
  }, [originPalette, palette, scrobblesForwardTimeline])

  useSceneAudio(
    RewindScene.Scrobbles,
    rewindData?.tracks.resources[7].preview,
    rewindData?.tracks.resources[7].name
  )

  if (!rewindData) {
    return null
  }

  function resolveColor(i: number, j: number) {
    return (i % 2 ? !(j % 2) : j % 2) ? 'var(--scene-main-color)' : 'inherit'
  }

  return (
    <Container
      id="scr"
      style={{
        '--scene-main-color': palette.color,
        '--scene-darker-color': palette.darkerColor
      }}
    >
      <Stack>
        {scrobblesList && (
          <ScrobbleListContainer className="list-container">
            <ScrobbleList>
              {scrobblesList.map((line, i) => (
                <Line className="scrobble-line" key={i}>
                  {line.map((digit, j) => (
                    <Digit key={j} color={resolveColor(i, j)}>
                      {digit}
                    </Digit>
                  ))}
                </Line>
              ))}
            </ScrobbleList>
          </ScrobbleListContainer>
        )}
        <TextsCentered>
          <ComplementaryText className="complementary-text">
            {t('scrobbles.top_text')}
          </ComplementaryText>
          <Digit
            style={{
              opacity: 0
            }}
          >
            2023
          </Digit>
          <ComplementaryText className="complementary-text bottom">
            {t('scrobbles.bottom_text')}
          </ComplementaryText>
        </TextsCentered>
        <Centered>
          <CountCopy className="count-copy">
            {rewindData.scrobbles.total
              .toString()
              .split('')
              .map((d) => (
                <Digit>{d}</Digit>
              ))}
          </CountCopy>
        </Centered>
      </Stack>
    </Container>
  )
}
