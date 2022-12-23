import styled from '@emotion/styled'
import ImageWithBorder from './ImageWithBorder'
import { FiPlay, FiPause } from 'react-icons/fi'
import { usePlayer } from '../hooks/usePlayer'
import { useEffect } from 'react'

const MediaButton = styled.button<{ color: string }>`
  margin-top: 12px;
  width: 42px;
  height: 42px;
  transition: 100ms ease-in-out;
  cursor: pointer;
  background: none;
  border: none;

  & svg {
    width: 100%;
    height: 100%;
    stroke: ${(p) => p.color};
  }

  @media only screen and (max-width: 600px) {
    width: 32px;
    height: 32px;
  }

  &:hover {
    transform: scale(1.1);
  }
`

const Texts = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  opacity: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;

  --width: 220px;

  padding: 8px;
  width: var(--width);

  & .image {
    width: var(--width);
    height: var(--width);
  }

  & h2 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: var(--width);
    font-variation-settings: 'wght' 900;
    font-size: 20px;
    text-align: center;
    margin: 1rem 0 0.5rem 0;
  }

  & h5 {
    text-align: center;
    margin: 0;
    font-size: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media only screen and (max-width: 1060px) {
    --width: 100px;
    flex-direction: row;
    width: 100%;
    align-items: center;
    padding: 8px 12px;

    & ${Texts} {
      margin-left: 12px;
      flex: 1;
      width: 30vw;
    }

    & h2 {
      margin: 0;
    }

    & ${Texts} * {
      text-align: start;
      width: 100%;
    }
  }

  @media only screen and (max-width: 760px) {
    & ${Texts} {
      width: fit-content;
      max-width: calc(80vw - var(--width));
    }
  }

  @media only screen and (max-width: 760px) and (max-height: 690px) {
    --width: 60px;
  }
`

export interface TopItemProps {
  image?: string | null
  color: string
  title: string
  secondary: string
  preview: string | null
}

export default function TopItem(props: TopItemProps) {
  const [setAudio, nowPlaying, playAudio, setActive, active] = usePlayer(
    (s) => [s.setAudio, s.nowPlaying, s.playAudio, s.setActive, s.active]
  )
  const audioKey = 'topTracks_' + props.title

  useEffect(() => {
    if (props.preview) {
      setAudio(audioKey, props.preview, props.title)
    }
  }, [props.preview])

  const playing = active && nowPlaying === audioKey

  const handleClick = () => {
    if (playing) {
      setActive(false)
    } else {
      playAudio(audioKey)
      if (!active) {
        setActive(true)
      }
    }
  }

  return (
    <Container className="top-item">
      <ImageWithBorder src={props.image ?? ''} color={props.color} />
      <Texts>
        <h2>{props.title}</h2>
        <h5>{props.secondary}</h5>
      </Texts>
      {props.preview && (
        <MediaButton color={props.color} onClick={handleClick}>
          {playing ? <FiPause /> : <FiPlay />}
        </MediaButton>
      )}
    </Container>
  )
}
