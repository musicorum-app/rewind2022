import styled from '@emotion/styled'
import Flex from '@react-css/flex'
import Centered from '@rewind/core/src/components/Centered'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palettes } from '../../theme/colors'
import { useRewindData } from '../Resolve/useDataResolve'
import { ReactComponent as PatreonLogo } from './assets/patreon.svg'
import { ReactComponent as DiscordLogo } from './assets/discord.svg'
import { ReactComponent as TwitterLogo } from './assets/twitter.svg'
import { ReactComponent as LastfmLogo } from './assets/lastfm.svg'
import { ReactComponent as GithubLogo } from './assets/github.svg'
import { ReactComponent as MusicorumLogo } from './assets/musicorum.svg'
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal'
import Dialog from '../../components/Dialog'
import { patronsList } from './patrons'
import { RewindScene } from '../../types'
import { useOrchestrator } from '../../hooks/useOrchestrator'
import { scenesStore } from '../scenes'
import {
  createFinishTimelineBackward,
  createFinishTimelineForward
} from './finishTimeline'
import { useSceneAudio } from '../../hooks/useSceneAudio'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 58px 20px 68px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;

  & h1 {
    opacity: 0;
    margin: 0;
    font-variation-settings: 'wght' 900;
    font-size: 4em;
  }

  & h2 {
    opacity: 0;
    font-size: 2.3em;
    margin: 0;
    font-variation-settings: 'wght' 700;
  }

  & p {
    opacity: 0;
    margin: 0.6em;
    font-size: 1.05em;
  }

  & h3 {
    opacity: 0;
    font-size: 1.4em;
    font-variation-settings: 'wght' 400;
    margin: 1em 0 0.5em;
  }

  & .ctas button,
  & .ctas a {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;

    & svg {
      width: 20px;
      height: auto;
    }
  }

  & button,
  & a {
    opacity: 0;
  }

  @media only screen and (max-height: 700px) {
    & h1 {
      font-size: 3em;
    }

    & h2 {
      font-size: 1.9em;
    }

    & p {
      margin: 0.6em;
      font-size: 0.85em;
    }

    & h3 {
      font-size: 1.3em;
    }
  }
`

const IconButton = styled.a`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  padding: 10px;
  border: none;
  background: transparent;
  transition: background 150ms ease-in-out;
  cursor: pointer;

  &:hover {
    background: rgb(255 255 255 / 10%);
  }

  & svg {
    width: 85%;
    height: 85%;
    & * {
      fill: white;
    }
  }

  @media only screen and (max-height: 700px) {
    width: 24px;
    height: 24px;
  }
`

const DialogContent = styled.div`
  text-align: center;

  & h2 {
    margin: 0 0 0.8em 0;
  }

  & h2::after {
    content: '';
    margin: auto;
    display: block;
    background: white;
    height: 1px;
    margin-top: 0.4em;
    width: 150px;
  }

  & p {
    margin: 0.4em;
  }
`

export default function FinishScene() {
  const rewindData = useRewindData()
  const [thanksDialogOpen, setThanksDialogOpen] = useState(false)
  const setTimelines = scenesStore((s) => s.setTimelines)
  const scene = useOrchestrator((s) => s.scene)

  const { t } = useTranslation()

  useSceneAudio(
    RewindScene.FinishScene,
    rewindData?.tracks.resources[16].preview,
    rewindData?.tracks.resources[16].name
  )

  useEffect(() => {
    setTimelines(
      RewindScene.FinishScene,
      {
        forward: {
          id: 'fns-forward',
          factory: createFinishTimelineForward
        },
        backward: {
          id: 'fns-backward',
          factory: createFinishTimelineBackward
        }
      },
      false
    )
  }, [])

  if (!rewindData) {
    return null
  }

  const tweetText = encodeURIComponent(
    t('finish.tweet_text', { count: rewindData.scrobbles.total }) as string
  )
  const tweetLink = `https://twitter.com/intent/tweet?text=${tweetText}`

  return (
    <Container
      id="fns"
      style={{
        pointerEvents: scene === RewindScene.FinishScene ? 'unset' : 'none'
      }}
    >
      <h1>2022</h1>
      <div>
        <h2>{t('finish.title')}</h2>
        <p>{t('finish.text1')}</p>
        <p>{t('finish.text2')}</p>
        <h3>{t('finish.text3')}</h3>
        <Flex column alignItemsCenter gap="12px">
          <Flex className="ctas" justifyCenter gap="12px">
            <a href="https://www.patreon.com/musicorumapp" target="_blank">
              <Button background="#FF424D" color="#141518">
                <PatreonLogo />
                Patreon
              </Button>
            </a>
            <a href={tweetLink} target="_blank">
              <Button background="#1DA1F2" color="white" as="a">
                <TwitterLogo />
                {t('finish.buttons.tweet')}
              </Button>
            </a>
          </Flex>

          <div />
          <div />

          <Flex justifyCenter gap="8px" className="social-buttons">
            <IconButton href="https://twitter.com/MusicorumApp" target="_blank">
              <TwitterLogo />
            </IconButton>
            <IconButton
              href="https://github.com/musicorum-app/"
              target="_blank"
            >
              <GithubLogo />
            </IconButton>
            <IconButton href="https://www.last.fm/user/metye" target="_blank">
              <LastfmLogo />
            </IconButton>
            <IconButton href="https://musicorumapp.com/" target="_blank">
              <MusicorumLogo
                style={{
                  width: '92%',
                  height: '92%'
                }}
              />
            </IconButton>
            <IconButton href="https://discord.gg/7shqxp9Mg4" target="_blank">
              <DiscordLogo />
            </IconButton>
          </Flex>

          <Flex justifyCenter gap="12px">
            <Button onClick={() => setThanksDialogOpen(true)}>
              {t('finish.buttons.thanks')}
            </Button>
            <Button
              as="a"
              onClick={() => {
                window.open('https://forms.gle/fdthihSKr969sJme7', '_blank')
              }}
            >
              {t('finish.buttons.feedback')}
            </Button>
          </Flex>
        </Flex>
      </div>
      <div />

      <Dialog
        open={thanksDialogOpen}
        onClose={() => setThanksDialogOpen(false)}
      >
        <DialogContent>
          <h2>A big thanks to our patrons!</h2>
          {patronsList.map((p) => (
            <p>{p}</p>
          ))}
        </DialogContent>
      </Dialog>
    </Container>
  )
}
