import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Flex from '@react-css/flex'
import Centered from '@rewind/core/src/components/Centered'
import {
  clamp,
  downloadFile,
  mapValue,
  mapValueAndClamp
} from '@rewind/core/src/utils'
import gsap from 'gsap'
import { useMemo, useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import { GradientSelect } from '../../components/GradientSelect'
import SwitcheableImage from '../../components/SwitcheableImage'
import TopItem from '../../components/TopItem'
import TopSceneTemplate from '../../components/TopSceneTemplate'
import { useOrchestrator } from '../../hooks/useOrchestrator'
import { useSceneAudio } from '../../hooks/useSceneAudio'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palette, Palettes, PaletteType } from '../../theme/colors'
import { RewindScene } from '../../types'
import { lastShareBackground } from '../Finish/finishTimeline'
import { useRewindData } from '../Resolve/useDataResolve'
import { scenesStore } from '../scenes'
import {
  createShareTimelineBackward,
  createShareTimelineForward
} from './shareTimeline'

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 30px;
  padding: 32px 32px;
  max-height: 100%;

  & h2 {
    text-align: center;
    font-size: 2rem;
    margin: 0;
    font-variation-settings: 'wght' 800;
  }

  & h3 {
    text-align: center;
    font-size: 1.2rem;
    margin: 0;
  }

  & .bottom-select {
    display: none !important;
  }

  & .side-select {
    padding-bottom: 125px;
  }

  & .text,
  & .image-share {
    opacity: 0;
  }

  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;

    & h2 {
      font-size: 1.2rem;
      margin-top: 0px;
    }

    & h3 {
      font-size: 1rem;
    }

    & .bottom-select {
      display: flex !important;
    }

    & .side-select {
      display: none !important;
    }
  }
`

const Stack = styled.div`
  position: relative;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 600px;
  pointer-events: none;

  & > *:last-of-type {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;

    & img {
      width: 100%;
      height: auto;
    }
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;

  & img {
    --v: 50%;
    max-height: calc(var(--h) - 200px);
    height: 1080px;
    max-width: 90vw;
    object-fit: contain;

    /* mask-image: linear-gradient(
      transparent calc(50% - 40px - var(--v)),
      black calc(50% - var(--v)),
      black calc(50% + var(--v)),
      transparent calc(50% + 40px + var(--v))
    ); */
  }

  & #stack *:last-of-type {
    /* position: relative;
    top: 0;
    left: 0; */
  }

  @media only screen and (max-width: 1000px) {
    & img {
      max-height: calc(var(--h) - 380px);
    }
  }
`

enum ImageMode {
  Square = 'Square',
  Stories = 'Stories'
}

export default function ShareScene() {
  const rewindData = useRewindData()
  const scene = useOrchestrator((s) => s.scene)

  const { t } = useTranslation()
  const squareImageRef = useRef<HTMLDivElement>(null)
  const storiesImageRef = useRef<HTMLDivElement>(null)

  const [squareChoices, storiesChoices] = useMemo(() => {
    const squares = {} as Record<PaletteType, string>
    const stories = {} as Record<PaletteType, string>

    for (const item of rewindData!.images.squareShare) {
      squares[item.palette] = item.url
    }

    for (const item of rewindData!.images.storiesShare) {
      stories[item.palette] = item.url
    }

    return [squares, stories]
  }, [])

  const [style, setStyle] = useState<PaletteType>(
    Object.keys(storiesChoices)[0]
  )
  const [transitioning, setTransitioning] = useState(false)
  const [mode, setMode] = useState(ImageMode.Stories)
  const setTimelines = scenesStore((s) => s.setTimelines)

  useEffect(() => {
    if (!rewindData) return

    const targetPalette = Palettes[style]

    setTimelines(
      RewindScene.ShareScene,
      {
        forward: {
          id: 'shr-forward',
          factory: () => createShareTimelineForward(targetPalette)
        },
        backward: {
          id: 'shr-backward',
          factory: () => createShareTimelineBackward(targetPalette)
        }
      },
      false
    )
  }, [style])

  useSceneAudio(
    RewindScene.ShareScene,
    rewindData?.tracks.resources[15].preview,
    rewindData?.tracks.resources[15].name
  )

  if (!rewindData) {
    return null
  }

  const palette = Palettes[style]

  lastShareBackground.value = palette

  // interpolateBackgroundGradient(palette.gradient, palette.gradient, 1)

  const changeMode = () => {
    const storiesImage = storiesImageRef.current
    const squareImage = squareImageRef.current
    if (transitioning || !storiesImage || !squareImage) return
    setTransitioning(true)
    const newMode =
      mode === ImageMode.Square ? ImageMode.Stories : ImageMode.Square
    setMode(newMode)
    const ease = 'sine.inOut'
    const duration = 0.5

    if (newMode === ImageMode.Square) {
      // squareImage.style.transform += ' translateZ(2px)'
      // storiesImage.style.transform += ' translateZ(0px)'
      gsap
        .timeline()
        .fromTo(
          squareImage,
          {
            opacity: 0,
            z: 200
          },
          {
            opacity: 1,
            z: 0,
            duration,
            ease
          }
        )
        .fromTo(
          storiesImage,
          {
            opacity: 1,
            z: 0
          },
          {
            opacity: 0,
            z: -200,
            duration,
            ease,
            onComplete: () => {
              setTransitioning(false)
            }
          },
          '0'
        )
    } else {
      // squareImage.style.transform += ' translateZ(0px)'
      // storiesImage.style.transform += ' translateZ(2px)'
      gsap
        .timeline()
        .fromTo(
          storiesImage,
          {
            opacity: 0,
            z: 200
          },
          {
            opacity: 1,
            z: 0,
            duration,
            ease
          }
        )
        .fromTo(
          squareImage,
          {
            opacity: 1,
            z: 0
          },
          {
            opacity: 0,
            z: -200,
            duration,
            ease,
            onComplete: () => {
              setTransitioning(false)
            }
          },
          '0'
        )
    }
  }

  const changeStyle = (palette: PaletteType) => () => {
    if (transitioning) return
    if (palette === style) return
    setTransitioning(true)
    setStyle(palette)
    gsap.to(document.body, {
      background: Palettes[palette].darkerColor,
      duration: 0.6
    })
  }

  const download = async () => {
    const choices = mode === ImageMode.Square ? squareChoices : storiesChoices
    const blob = await fetch(choices[style]).then((r) => r.blob())
    downloadFile(blob, 'Musicorum Rewind Share.jpg')
  }

  return (
    <Centered id="shr" pointerEvents={scene === RewindScene.ShareScene}>
      <Container>
        <div className="text">
          <h2>{t('share.title')}</h2>
          <h3>{t('share.text')}</h3>
        </div>
        <ImageContainer className="image-share">
          <Flex row alignItemsCenter gap="15px">
            <Flex column gap="10px" className="side-select">
              {Object.keys(storiesChoices).map((choice) => (
                <GradientSelect
                  key={choice}
                  onClick={changeStyle(choice)}
                  palette={Palettes[choice]}
                />
              ))}
            </Flex>
            <Flex column alignItemsCenter gap="15px">
              <Stack id="stack">
                <div ref={storiesImageRef}>
                  <SwitcheableImage
                    choices={storiesChoices}
                    choice={style}
                    onTransitionChange={setTransitioning}
                  />
                </div>
                <div ref={squareImageRef}>
                  <SwitcheableImage
                    choices={squareChoices}
                    choice={style}
                    onTransitionChange={setTransitioning}
                  />
                </div>
              </Stack>
              <Flex row gap="10px" className="bottom-select">
                {Object.keys(storiesChoices).map((choice) => (
                  <GradientSelect
                    key={choice}
                    onClick={changeStyle(choice)}
                    palette={Palettes[choice]}
                  />
                ))}
              </Flex>
              <Button
                onClick={download}
                background={palette.color}
                color={palette.darkerColor}
              >
                {t('common.download')}
              </Button>
              <Button
                onClick={changeMode}
                background={palette.color}
                color={palette.darkerColor}
                style={{
                  fontSize: 15,
                  padding: '6px 14px'
                }}
              >
                {t('share.change_mode')}
              </Button>
            </Flex>
          </Flex>
        </ImageContainer>
      </Container>
    </Centered>
  )
}
