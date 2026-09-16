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
  createArtistShareTimelineBackward,
  createArtistShareTimelineForward,
  lastArtistShareBackground
} from './artistShareTimeline'
import { ArtistShare } from '../../modules/rewindDataExtras'
import { imageTypeDefaultImages } from '../../modules/lastfmImage'

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
  /* transform-style: preserve-3d; */
  /* perspective: 600px; */
  pointer-events: none;

  & > *:last-of-type {
    /* position: absolute; */
    /* top: 50%; */
    /* transform: translateY(-50%); */
    /* opacity: 0;

    & img {
      width: 100%;
      height: auto;
    } */
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

const ArtistSelect = styled(GradientSelect)<{ imageUrl: string }>`
  background-image: url(${(p) => p.imageUrl});
  background-size: contain;
`

export default function ArtistShareScene() {
  const rewindData = useRewindData()
  const scene = useOrchestrator((s) => s.scene)

  const { t } = useTranslation()

  const [selectedArtist, setSelectedArtist] = useState<number>(0)
  const [transitioning, setTransitioning] = useState(false)
  const setTimelines = scenesStore((s) => s.setTimelines)

  const images = rewindData?.images.artistShares ?? []

  const imagesChoices = useMemo(() => {
    const choices = {} as Record<string, string> // str index -> img url

    for (let index = 0; index < images.length; index++) {
      choices[index.toString()] = images[index].image.url
    }
    return choices
  }, [images])

  useEffect(() => {
    if (!rewindData) return

    const targetPalette = Palettes[images[selectedArtist].image.palette]
    const backwardPalette =
      Palettes[rewindData.albums.items[0].image.palette ?? PaletteType.Black]

    setTimelines(
      RewindScene.ArtistShareScene,
      {
        forward: {
          id: 'asr-forward',
          factory: () =>
            createArtistShareTimelineForward(backwardPalette, targetPalette)
        },
        backward: {
          id: 'asr-backward',
          factory: () =>
            createArtistShareTimelineBackward(backwardPalette, targetPalette)
        }
      },
      false
    )
  }, [selectedArtist])

  useSceneAudio(
    RewindScene.ArtistShareScene,
    rewindData?.tracks.resources[21].preview,
    rewindData?.tracks.resources[21].name
  )

  if (!rewindData) {
    return null
  }

  const currentArtist = images[selectedArtist]
  const currentPalette = Palettes[images[selectedArtist].image.palette]

  lastArtistShareBackground.value = currentPalette

  // interpolateBackgroundGradient(palette.gradient, palette.gradient, 1)

  const changeArtist = (newIndex: number) => () => {
    if (transitioning) return
    if (newIndex === selectedArtist) return
    setTransitioning(true)
    setSelectedArtist(newIndex)
    const newPalette = images[newIndex].image.palette
    gsap.to(document.body, {
      background: Palettes[newPalette].darkerColor,
      duration: 0.6
    })
  }

  const download = async () => {
    const blob = await fetch(currentArtist.image.url).then((r) => r.blob())
    downloadFile(
      blob,
      `Musicorum Rewind ${currentArtist.artist.name} Share.jpg`
    )
  }

  return (
    <Centered id="asr" pointerEvents={scene === RewindScene.ArtistShareScene}>
      <Container>
        <div className="text">
          <h2>{t('artist_share.title')}</h2>
          <h3>{t('artist_share.text')}</h3>
        </div>
        <ImageContainer className="image-share">
          <Flex row alignItemsCenter gap="15px">
            <Flex column gap="10px" className="side-select">
              {images.map((artistImage, index) => (
                <ArtistSelect
                  key={index}
                  imageUrl={
                    artistImage.artist.image.url ??
                    imageTypeDefaultImages.ARTIST
                  }
                  onClick={changeArtist(index)}
                  palette={Palettes[artistImage.image.palette]}
                />
              ))}
            </Flex>
            <Flex column alignItemsCenter gap="15px">
              <Stack id="stack">
                <SwitcheableImage
                  choices={imagesChoices}
                  choice={selectedArtist.toString()}
                  onTransitionChange={setTransitioning}
                />
              </Stack>
              <Flex row gap="10px" className="bottom-select">
                {images.map((artistImage, index) => (
                  <ArtistSelect
                    key={index}
                    onClick={changeArtist(index)}
                    imageUrl={
                      artistImage.artist.image.url ??
                      imageTypeDefaultImages.ARTIST
                    }
                    palette={Palettes[artistImage.image.palette]}
                  />
                ))}
              </Flex>
              <Button
                onClick={download}
                background={currentPalette.color}
                color={currentPalette.darkerColor}
              >
                {t('common.download')}
              </Button>
            </Flex>
          </Flex>
        </ImageContainer>
      </Container>
    </Centered>
  )
}
