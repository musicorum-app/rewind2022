import styled from '@emotion/styled'
import Flex from '@react-css/flex'
import Centered from '@rewind/core/src/components/Centered'
import { downloadFile } from '@rewind/core/src/utils'
import gsap from 'gsap'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import { GradientSelect } from '../../components/GradientSelect'
import SwitcheableImage from '../../components/SwitcheableImage'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palettes, PaletteType } from '../../theme/colors'
import { useRewindData } from '../Resolve/useDataResolve'
import { ReactComponent as SpotifyLogo } from './assets/spotify.svg'
import { ReactComponent as DeezerLogo } from './assets/deezer.svg'
import { getSpotifyUser, launchSpotifyLogin } from './services/spotify'
import {
  createPlaylist,
  handleMessage,
  PlaylistData,
  PlaylistUser
} from './common'
import Dialog from '../../components/Dialog'
import { LoadingIndicator } from '../../components/LoadingIndicator'
import { DialogContent } from './DialogContent'
import { launchDeezerLogin } from './services/deezer'
import { scenesStore } from '../scenes'
import { RewindScene } from '../../types'
import {
  createPlaylistTimelineBackward,
  createPlaylistTimelineForward
} from './playlistTimeline'
import { lastBackground } from '../Share/shareTimeline'
import { gradientToCss } from '../../utils/style'
import { useOrchestrator } from '../../hooks/useOrchestrator'

const SocialButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 100;

  & svg {
    width: 28px;
    height: auto;
  }

  @media only screen and (max-width: 900px) {
    font-size: 15px;
    padding: 6px 16px;

    & svg {
      width: 24px;
      height: auto;
    }
  }
`

const Container = styled.div`
  opacity: 0;
  display: flex;
  align-items: center;
  gap: 30px;

  & #button-group {
    padding-bottom: calc(42px + 10px);
    width: 280px;

    & button {
      width: 100%;
      height: 37px;
    }
  }

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
    & #button-group {
      padding-bottom: 0;
      width: 230px;

      & button {
        font-size: 15px;
        padding: 6px 16px;
      }
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
    max-height: min(calc(var(--h) - 200px), 400px);
    max-width: min(calc(100vw - 120px), 400px);
    object-fit: contain;
  }

  @media only screen and (max-width: 900px) {
    gap: 8px;
    & img {
      max-height: calc(var(--h) - 330px);
    }
  }
`

export default function PlaylistScene() {
  const rewindData = useRewindData()
  const [playlist, setPlaylist] = useState<PlaylistData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const setTimelines = scenesStore((s) => s.setTimelines)

  const choices = useMemo(() => {
    const obj = {} as Record<PaletteType, string>

    for (const item of rewindData!.images.playlist) {
      obj[item.palette] = item.url
    }

    return obj
  }, [])

  const [style, setStyle] = useState<PaletteType>(Object.keys(choices)[0])
  const [transitioning, setTransitioning] = useState(false)
  const scene = useOrchestrator((s) => s.scene)

  const { t } = useTranslation()

  // useEffect(() => {
  //   interpolateBackgroundGradient(
  //     Palettes.Black.gradient,
  //     Palettes.Black.gradient,
  //     1
  //   )
  // }, [rewindData])

  useEffect(() => {
    const listener = async (ev: MessageEvent) => {
      const data = handleMessage(ev)
      if (data && rewindData) {
        setDialogOpen(true)
        setLoading(true)

        const image =
          rewindData.images.playlist.find((i) => i.palette === style) ||
          rewindData.images.playlist[0]
        try {
          setPlaylist(
            await createPlaylist(
              data,
              t,
              rewindData.tracks.resources,
              image.url
            )
          )
        } catch (err) {
          console.error(err)
          setError('Something went wrong')
        }
        setLoading(false)
      }
    }
    window.addEventListener('message', listener)

    return () => {
      window.removeEventListener('message', listener)
    }
  }, [style])

  useEffect(() => {
    if (!rewindData) return

    const scenePalette = Palettes[style]

    setTimelines(
      RewindScene.PlaylistScene,
      {
        forward: {
          id: 'pll-forward',
          factory: () => createPlaylistTimelineForward(scenePalette)
        },
        backward: {
          id: 'pll-backward',
          factory: () => createPlaylistTimelineBackward(scenePalette)
        }
      },
      false
    )
  }, [style])

  if (!rewindData) {
    return null
  }

  lastBackground.value = Palettes[style]

  const changeStyle = (palette: PaletteType) => () => {
    if (transitioning) return
    if (palette === style) return
    setTransitioning(true)
    setStyle(palette)
    gsap.to(document.body, {
      background: Palettes[palette].darkerColor,
      duration: 0.4
    })
  }

  const downloadImage = async () => {
    const blob = await fetch(choices[style]).then((r) => r.blob())
    downloadFile(blob, 'Musicorum Rewind Playlist.jpg')
  }

  return (
    <Centered pointerEvents={scene === RewindScene.PlaylistScene}>
      <Container id="pll">
        <ImageContainer>
          <SwitcheableImage
            choices={choices}
            choice={style}
            onTransitionChange={setTransitioning}
          />
          <Flex row gap="10px">
            {Object.keys(choices).map((choice) => (
              <GradientSelect
                onClick={changeStyle(choice)}
                palette={Palettes[choice]}
              />
            ))}
          </Flex>
        </ImageContainer>
        <Flex column alignItemsCenter gap="15px" id="button-group">
          <SocialButton
            onClick={launchSpotifyLogin}
            color="black"
            background="#1ED760"
          >
            <SpotifyLogo />
            {t('playlist.save_on', { service: 'Spotify' })}
          </SocialButton>

          <SocialButton
            onClick={launchDeezerLogin}
            color="black"
            background="white"
          >
            <DeezerLogo />
            {t('playlist.save_on', { service: 'Deezer' })}
          </SocialButton>

          <Button
            onClick={downloadImage}
            background={Palettes[style].color}
            color={Palettes[style].darkerColor}
          >
            {t('playlist.download')}
          </Button>
        </Flex>
      </Container>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        disableClose={loading}
      >
        <DialogContent loading={loading} error={error} playlist={playlist} />
      </Dialog>
    </Centered>
  )
}
