import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useTranslation } from 'react-i18next'
import { usePlayer } from '../hooks/usePlayer'
import { interpolateBackgroundGradient } from '../modules/backgroundGradient'
import { Image } from '../modules/rewindDataExtras'
import { Palettes, PaletteType } from '../theme/colors'
import TopItem from './TopItem'

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
  ableToPlay?: boolean
  topText: string
  bottomText: string
}

export default function TopSceneTemplate(props: TopSceneTemplateProps) {
  const { t } = useTranslation()

  const [medium, small, rellySmall] = useMediaQuery([
    '(max-width: 1300px)',
    '(max-width: 1060px)',
    '(max-width: 760px) and (max-height: 900px)'
  ])

  const count = small && !rellySmall ? 6 : medium ? 4 : 5

  const color =
    Palettes[props.items[0].image.palette ?? PaletteType.Black].color

  interpolateBackgroundGradient(
    Palettes[props.items[0].image.palette ?? PaletteType.Black].gradient,
    Palettes[props.items[0].image.palette ?? PaletteType.Black].gradient,
    1
  )

  return (
    <Centered column>
      <ComplementaryText>{props.topText}</ComplementaryText>
      <Container>
        {props.items.slice(0, count).map((track, index) => (
          <TopItem
            key={index}
            title={track.name}
            secondary={t('common.scrobbles', {
              count: track.scrobbles
            })}
            image={track.image.url}
            color={color || 'black'}
            preview={track.preview ?? null}
          />
        ))}
      </Container>
      <ComplementaryText>{props.bottomText}</ComplementaryText>
    </Centered>
  )
}
