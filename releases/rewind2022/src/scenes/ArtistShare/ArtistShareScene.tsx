import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Flex from '@react-css/flex'
import Centered from '@rewind/core/src/components/Centered'
import { downloadFile } from '@rewind/core/src/utils'
import gsap from 'gsap'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import { GradientSelect } from '../../components/GradientSelect'
import SwitcheableImage from '../../components/SwitcheableImage'
import TopItem from '../../components/TopItem'
import TopSceneTemplate from '../../components/TopSceneTemplate'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palette, Palettes, PaletteType } from '../../theme/colors'
import { useRewindData } from '../Resolve/useDataResolve'

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
  }

  @media only screen and (max-width: 1000px) {
    grid-template-columns: 1fr;

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
  gap: 20px;
  height: 100%;

  & img {
    --v: 50%;
    max-height: calc(100vh - 180px);
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

  @media only screen and (max-width: 1000px) {
    & img {
      max-height: calc(100vh - 310px);
    }
  }
`

const choices = {
  [PaletteType.Chuu]:
    'https://media.discordapp.net/attachments/937575765753597972/1044088208453017610/image.png?width=720&height=1280',
  [PaletteType.WeirdSky]:
    'https://media.discordapp.net/attachments/385855125048131588/1046581335331962880/image.png?width=720&height=1280',
  [PaletteType.Orange]:
    'https://media.discordapp.net/attachments/385855125048131588/1046581399412551811/image.png?width=720&height=1280'
}

export default function ArtistShareScene() {
  const rewindData = useRewindData()
  const [style, setStyle] = useState<keyof typeof choices>(PaletteType.WeirdSky)
  const [transitioning, setTransitioning] = useState(false)

  const { t } = useTranslation()

  if (!rewindData) {
    return null
  }

  const palette = Palettes[style]

  // interpolateBackgroundGradient(palette.gradient, palette.gradient, 1)

  const changeStyle = (palette: keyof typeof choices) => () => {
    if (transitioning) return
    setTransitioning(true)
    setStyle(palette)
    const gradient = Palettes[palette].gradient
    gsap.to(document.body, {
      background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
      duration: 0.4
    })
  }

  const download = async () => {
    const blob = await fetch(choices[style]).then((r) => r.blob())
    downloadFile(blob, 'Musicorum Rewind Artist.jpg')
  }

  return (
    <Centered>
      <Container>
        <h2>
          You spent so much time with this artist that you should spread your
          love for them
        </h2>
        <ImageContainer>
          <Flex row alignItemsCenter gap="15px">
            <Flex column alignItemsCenter gap="15px">
              <SwitcheableImage
                choices={choices}
                choice={style}
                onTransitionChange={setTransitioning}
              />
              <Flex row gap="10px">
                <GradientSelect
                  onClick={changeStyle(PaletteType.Chuu)}
                  palette={Palettes.Chuu}
                />
                <GradientSelect
                  onClick={changeStyle(PaletteType.WeirdSky)}
                  palette={Palettes.WeirdSky}
                />
                <GradientSelect
                  onClick={changeStyle(PaletteType.Orange)}
                  palette={Palettes.Orange}
                />
              </Flex>
              <Button onClick={download} background={palette.color}>
                DOWNLOAD
              </Button>
            </Flex>
          </Flex>
        </ImageContainer>
      </Container>
    </Centered>
  )
}
