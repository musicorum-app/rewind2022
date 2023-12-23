import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useTranslation } from 'react-i18next'
import { useOrchestrator } from '../hooks/useOrchestrator'
import { usePlayer } from '../hooks/usePlayer'
import { interpolateBackgroundGradient } from '../modules/backgroundGradient'
import { Image } from '../modules/rewindDataExtras'
import { Gradient, Palettes, PaletteType } from '../theme/colors'
import { RewindScene } from '../types'
import TopItem from './TopItem'
import { ImageType } from '../modules/lastfmImage'

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: var(--margin);

  @media only screen and (max-width: 1060px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`

const ComplementaryText = styled.h2`
  opacity: 0;
  text-shadow: 0px 3px 20px #000000cc;
  font-size: 1.6em;
  margin: 0;
  text-align: center;
  padding: 0 20px;
  box-sizing: border-box;
  @media only screen and (max-width: 1060px) {
    font-size: 1.2em;
  }
`

interface TopSceneTemplateProps {
  items: {
    name: string
    scrobbles: number
    image: Image
    preview?: string | null
  }[]
  imageType: ImageType
  ableToPlay?: boolean
  topText: string
  bottomText: string
  scene: RewindScene
  palette: PaletteType
  id?: string
}

export default function TopSceneTemplate(props: TopSceneTemplateProps) {
  const { t } = useTranslation()
  const scene = useOrchestrator((s) => s.scene)

  const [medium, small, rellySmall] = useMediaQuery([
    '(max-width: 1300px)',
    '(max-width: 1060px)',
    '(max-width: 760px) and (max-height: 900px)'
  ])

  const count = small && !rellySmall ? 6 : medium ? 4 : 5

  const palette = Palettes[props.palette]

  return (
    <Centered
      column
      id={props.id}
      pointerEvents={scene === props.scene}
      style={{
        '--scene-main-color': palette.color,
        '--scene-darker-color': palette.darkerColor
      }}
    >
      <ComplementaryText className="text">{props.topText}</ComplementaryText>
      <Container>
        {props.items.slice(0, count).map((track, index) => (
          <TopItem
            key={index}
            index={index}
            title={track.name}
            secondary={t('common.scrobbles', {
              count: track.scrobbles
            })}
            image={track.image.url}
            imageType={props.imageType}
            color={palette.color}
            preview={track.preview ?? null}
          />
        ))}
      </Container>
      <ComplementaryText className="text">{props.bottomText}</ComplementaryText>
    </Centered>
  )
}
