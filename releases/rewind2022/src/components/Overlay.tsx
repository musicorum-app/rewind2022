import styled from '@emotion/styled'
import { ReactComponent as LogoComponent } from '../assets/logo.svg'
import { ReactComponent as LanguageIcon } from '../assets/icons/language.svg'
import { usePlayer } from '../hooks/usePlayer'
import { FiGlobe, FiVolume2, FiVolumeX } from 'react-icons/fi'
import Flex from '@react-css/flex'
import { useEffect } from 'react'

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

  @media only screen and (max-width: 400px) {
    & > div:first-of-type svg {
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

export default function Overlay() {
  const [nowPlaying, audios, active, setActive] = usePlayer((s) => [
    s.nowPlaying,
    s.audios,
    s.active,
    s.setActive
  ])
  const nowPlayingName = nowPlaying ? audios.get(nowPlaying)?.name : null

  const toggleActive = () => setActive(!active)

  return (
    <>
      <Container>
        <div>
          <LogoComponent />
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
    </>
  )
}
