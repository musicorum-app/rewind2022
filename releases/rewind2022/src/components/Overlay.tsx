import styled from '@emotion/styled'
import { ReactComponent as LogoComponent } from '../assets/logo.svg'
import { ReactComponent as LanguageIcon } from '../assets/icons/language.svg'
import { ReactComponent as NextIcon } from '../assets/icons/nextIcon.svg'
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg'
import { usePlayer } from '../hooks/usePlayer'
import { FiGlobe, FiVolume2, FiVolumeX } from 'react-icons/fi'
import Flex from '@react-css/flex'
import { useEffect } from 'react'
import { useOrchestrator } from '../hooks/useOrchestrator'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: var(--margin);
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  max-width: 100vw;
  pointer-events: none;

  @media only screen and (max-width: 400px) {
    & #logo {
      width: 120px;
    }
  }
`

const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  margin: 0;
  padding: 3px;
  width: 32px;
  height: 32px;
  height: auto;
  display: flex;
  transition: 100ms ease-in-out;
  pointer-events: all;

  @media only screen and (max-width: 600px) {
    width: 26px;
    height: 26px;
  }

  & svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    transform: scale(1.1);
  }
`

const NowPlaying = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: end;
  min-width: 0;
  max-width: min(20vw, 400px);

  & h5,
  & h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

  & h5 {
    min-width: 0;
    font-size: 9px;
    margin: 0;
    font-variation-settings: 'wght' 800;
    opacity: 0.7;
  }

  & h3 {
    font-size: 14px;
    margin: 0;
    font-variation-settings: 'wght' 700;
  }

  @media only screen and (max-width: 600px) {
    & h5 {
      display: none;
    }

    & h3 {
      font-size: 12px;
    }
  }
`

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  pointer-events: none;

  & > * {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  & > div:last-of-type {
    justify-content: end;
  }
`

const NextIconButton = styled.button`
  background: transparent;
  border: 0;
  width: auto;
  cursor: pointer;
  opacity: 0.6;
  transition: all 150ms ease-in-out;
  pointer-events: all;

  &:hover {
    opacity: 1;
    transform: translateY(4px);
  }

  & svg {
    stroke: white;
    width: 24px;
    height: 24px;
  }
`

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30px;
  pointer-events: all;

  &,
  & * {
    transition: all 200ms ease-in-out;
  }

  & button {
    background: transparent;
    border: none;
    opacity: 0.8;
    cursor: pointer;

    &:hover {
      opacity: 1;
      transform: translateY(-2px);
    }

    &:last-of-type:hover {
      transform: translateY(2px);
    }
  }

  & span {
    font-size: 14px;
    opacity: 0.8;
  }

  & svg {
    stroke: white;
    width: 20px;
    height: auto;
  }

  & button:last-of-type svg {
    transform: rotate(180deg);
  }
`

export default function Overlay() {
  const [nowPlaying, audios, active, setActive] = usePlayer((s) => [
    s.nowPlaying,
    s.audios,
    s.active,
    s.setActive
  ])
  const [prev, next] = useOrchestrator((s) => [s.prev, s.next])
  const nowPlayingName = nowPlaying ? audios.get(nowPlaying)?.name : null

  const toggleActive = () => setActive(!active)

  return (
    <>
      <Container>
        <div>
          <LogoComponent id="logo" />
        </div>
        <Flex row alignItemsCenter gap="6px">
          {active && (
            <NowPlaying>
              <h5>{nowPlayingName && 'NOW PLAYING'}</h5>
              <h3>{nowPlayingName}</h3>
            </NowPlaying>
          )}
          <IconButton aria-label="mute audio" onClick={toggleActive}>
            {active ? <FiVolume2 /> : <FiVolumeX />}
          </IconButton>
          <IconButton aria-label="change language" onClick={console.log}>
            <FiGlobe />
          </IconButton>
        </Flex>
      </Container>

      <Container
        style={{
          bottom: 0,
          top: 'unset',
          padding: '16px 20px'
        }}
      >
        <BottomRow>
          <div></div>
          <div>
            <NextIconButton onClick={next}>
              <NextIcon />
            </NextIconButton>
          </div>
          <div>
            <ControlsContainer>
              <button onClick={prev}>
                <ArrowIcon />
              </button>
              <span>4/23</span>
              <button onClick={next}>
                <ArrowIcon />
              </button>
            </ControlsContainer>
          </div>
        </BottomRow>
      </Container>
    </>
  )
}
