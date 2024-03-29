import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useTranslation } from 'react-i18next'
import { useRewindData } from '../Resolve/useDataResolve'
import { useMemo, useRef, useEffect } from 'react'
import useWindowSize from '@rewind/core/src/hooks/useWindowSize'
import WordCloud from 'wordcloud'
import { clamp, mapValue, mapValueAndClamp } from '@rewind/core/src/utils'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palettes, PaletteType } from '../../theme/colors'
import { scenesStore } from '../scenes'
import { RewindScene } from '../../types'
import {
  createTagTimelineBackward,
  createTagTimelineForward
} from './tagCloudTimeline'
import { useSceneAudio } from '../../hooks/useSceneAudio'
import { usePaletteToolkit } from '../../hooks/usePaletteToolkit'
import chroma from 'chroma-js'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 58px var(--margin);

  box-sizing: border-box;

  & h2 {
    opacity: 0;
  }

  & canvas {
    position: absolute;
    left: 0;
    top: 0;
    mask-image: linear-gradient(transparent, transparent);
  }
`

const CloudWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`

export default function TagCloudScene() {
  const rewindData = useRewindData()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const windowSize = useWindowSize()
  const setTimelines = scenesStore((s) => s.setTimelines)

  const { t } = useTranslation()

  useSceneAudio(
    RewindScene.TagCloudScene,
    rewindData?.tracks.resources[13].preview,
    rewindData?.tracks.resources[13].name
  )

  const scenePaletteType = usePaletteToolkit(
    RewindScene.TagCloudScene,
    rewindData?.albums.items[0].image.palette ?? PaletteType.Wine
  )
  const scenePalette = Palettes[scenePaletteType]

  useEffect(() => {
    if (canvasRef.current && wrapperRef.current && rewindData) {
      const wrapperBounds = wrapperRef.current.getBoundingClientRect()
      const canvas = canvasRef.current
      const ratio = window.devicePixelRatio
      canvas.width = wrapperBounds.width * ratio
      canvas.height = wrapperBounds.height * ratio
      canvas.style.top = wrapperBounds.top + 'px'
      canvas.style.left = wrapperBounds.left + 'px'
      canvas.style.width = wrapperBounds.width + 'px'
      canvas.style.height = wrapperBounds.height + 'px'

      const area = canvas.width * canvas.height
      const fraction = clamp(mapValue(area, [200000, 2000000], [0, 1]), 0, 2)
      const minSize = mapValue(fraction, [0, 1], [7, 13])
      const maxSize = mapValue(fraction, [0, 1], [120, 320])

      const tags = rewindData.tracks.resources.flatMap((t) => t.tags)
      const weights = new Map<string, number>()

      if (tags.length === 0) {
        tags[0] = 'could not find any tag :('
      }

      for (const tag of tags) {
        const weight = 1 + (weights.get(tag) || 0)
        weights.set(tag, weight)
      }

      let list = [...weights.entries()]
      const maxWeight = list.sort((a, b) => b[1] - a[1])[0][1]

      list = list.map(([tag, w]) => {
        const weight = mapValue(w, [0, maxWeight], [minSize, maxSize])
        return [tag, Math.round(weight)]
      })

      console.log(list)

      WordCloud(canvasRef.current, {
        list,
        backgroundColor: 'transparent',
        weightFactor: Math.max(ratio * 0.6, 1.2),
        fontFamily: 'Satoshi-Medium, sans-serif',
        color(_, weight) {
          const factor = mapValue(Number(weight), [12, maxSize * 0.8], [0, 1])
          const alpha = clamp(factor, 0.3, 1)
          return chroma(scenePalette.color).alpha(alpha).hex()
        },
        shrinkToFit: true
      })

      return () => {
        WordCloud.stop()
      }
    }
  }, [
    rewindData,
    windowSize,
    canvasRef.current,
    wrapperRef.current,
    scenePalette
  ])

  useEffect(() => {
    if (!rewindData) return

    const backwardPalette =
      Palettes[rewindData.albums.items[0].image.palette ?? PaletteType.Black]

    setTimelines(RewindScene.TagCloudScene, {
      forward: {
        id: 'tag-forward',
        factory: () => createTagTimelineForward(backwardPalette, scenePalette)
      },
      backward: {
        id: 'tag-backward',
        factory: () => createTagTimelineBackward(backwardPalette, scenePalette)
      }
    })
  }, [rewindData, canvasRef.current, scenePalette])

  if (!rewindData) {
    return null
  }

  return (
    <Centered id="tag">
      <Container>
        <h2>{t('tag_cloud.title')}</h2>
        <CloudWrapper ref={wrapperRef}></CloudWrapper>
        <canvas ref={canvasRef} />
      </Container>
    </Centered>
  )
}
