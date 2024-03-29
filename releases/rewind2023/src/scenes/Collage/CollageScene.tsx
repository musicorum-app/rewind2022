import { CircularProgress, useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Flex from '@react-css/flex'
import Centered from '@rewind/core/src/components/Centered'
import useWindowResize from '@rewind/core/src/hooks/useWindowResize'
import useWindowSize from '@rewind/core/src/hooks/useWindowSize'
import { downloadFile } from '@rewind/core/src/utils'
import { generateRewindGrid } from '@rewind/resolver/src/api/musicorum'
import gsap from 'gsap'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import { GradientSelect } from '../../components/GradientSelect'
import ImageWithBorder from '../../components/ImageWithBorder'
import SwitcheableImage from '../../components/SwitcheableImage'
import TopItem from '../../components/TopItem'
import TopSceneTemplate from '../../components/TopSceneTemplate'
import { useOrchestrator } from '../../hooks/useOrchestrator'
import { useSceneAudio } from '../../hooks/useSceneAudio'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palette, Palettes, PaletteType } from '../../theme/colors'
import { RewindScene } from '../../types'
import { useRewindData } from '../Resolve/useDataResolve'
import { scenesStore } from '../scenes'
import {
  createCollageSceneTimelineBackward,
  createCollageSceneTimelineForward
} from './collageSceneTimeline'
import { usePaletteToolkit } from '../../hooks/usePaletteToolkit'
import { useCollageStore } from './collage.store'

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 30px;
  padding: 32px 32px;
  height: calc(var(--h) - 120px);
  max-height: calc(var(--h) - 120px);
  & #collage-image {
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    width: 1px;
    height: 1px;
    border-radius: 12px;
  }

  & h2 {
    text-align: center;
    font-size: 2rem;
    opacity: 0;
  }

  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 5fr;

    & h2 {
      font-size: 1.2rem;
      margin-top: 30px;
    }
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-height: calc(var(--h) - 100px);
  height: 100%;

  & #collage-image-ref {
    display: inline;
    height: 100%;
    width: 100%;
    /* max-width: 100%; */

    /* mask-image: linear-gradient(
      transparent calc(50% - 40px - var(--v)),
      black calc(50% - var(--v)),
      black calc(50% + var(--v)),
      transparent calc(50% + 40px + var(--v))
    ); */
  }

  & button {
    opacity: 0;
  }

  @media only screen and (max-width: 1000px) {
    & img {
      /* max-height: calc(100vh - 310px); */
    }
  }
`

export default function CollageScene() {
  const rewindData = useRewindData()
  const imageUrl = useCollageStore()
  const windowSize = useWindowSize()
  const imageRef = useRef<HTMLImageElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const setTimelines = scenesStore((s) => s.setTimelines)
  const scene = useOrchestrator((s) => s.scene)
  const [text, setText] = useState('Loading...')

  const { t } = useTranslation()

  useSceneAudio(
    RewindScene.CollageScene,
    rewindData?.tracks.resources[12].preview,
    rewindData?.tracks.resources[12].name
  )

  if (!rewindData) {
    return null
  }

  const load = async () => {
    try {
      const tiles = rewindData.albums.items.map((album) => ({
        name: album.name + ' fix',
        image: album.image.url
      }))
      const result = await generateRewindGrid(tiles)
      if (!Array.isArray(result) && result.url) {
        useCollageStore.setState(result.url)
      } else {
        throw new Error()
      }
    } catch (err) {
      setText('Could not create your collage :(')
      console.error(err)
    }
  }

  console.log(text)

  useEffect(() => {
    if (rewindData && !imageUrl) {
      load()
    }
  }, [rewindData])

  const download = async () => {
    if (!imageUrl) return
    const blob = await fetch(imageUrl).then((r) => r.blob())
    downloadFile(blob, 'Musicorum Rewind collage.jpg')
  }

  useEffect(() => {
    // fuck css
    if (imageContainerRef.current && imageRef.current) {
      const refBounding = imageContainerRef.current.getBoundingClientRect()
      let size: number, x: number, y: number

      if (refBounding.width > refBounding.height) {
        size = refBounding.height
        x = refBounding.left + (refBounding.width - size) / 2
        y = refBounding.top
      } else {
        size = refBounding.width
        x = refBounding.left + (refBounding.width - size) / 2
        y = refBounding.top + (refBounding.height - size) / 2
      }

      imageRef.current.style.width = size + 'px'
      imageRef.current.style.height = size + 'px'
      imageRef.current.style.left = x + 'px'
      imageRef.current.style.top = y + 'px'
    }
  }, [windowSize, imageRef.current, imageContainerRef.current])

  const scenePaletteType = usePaletteToolkit(
    RewindScene.CollageScene,
    rewindData?.albums.items[0].image.palette ?? PaletteType.Wine
  )
  const scenePalette = Palettes[scenePaletteType]

  useEffect(() => {
    setTimelines(RewindScene.CollageScene, {
      forward: {
        id: 'clg-forward',
        factory: createCollageSceneTimelineForward
      },
      backward: {
        id: 'clg-backward',
        factory: createCollageSceneTimelineBackward
      }
    })
  }, [])

  return (
    <Centered id="clg" pointerEvents={scene === RewindScene.CollageScene}>
      <Container>
        <h2>{t('collage.text')}</h2>
        <ImageContainer>
          {imageUrl ? (
            <Fragment>
              <div id="collage-image-ref" ref={imageContainerRef}></div>

              <Button onClick={download} background={scenePalette.color}>
                DOWNLOAD
              </Button>
            </Fragment>
          ) : (
            <span>{scene === RewindScene.CollageScene ? text : ''}</span>
          )}
        </ImageContainer>
        <ImageWithBorder
          id="collage-image"
          color={scenePalette.color}
          ref={imageRef}
          src={imageUrl!}
        />
      </Container>
    </Centered>
  )
}
