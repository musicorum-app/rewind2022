import { useMediaQuery } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import TopItem from '../../components/TopItem'
import TopSceneTemplate from '../../components/TopSceneTemplate'
import { Palettes } from '../../theme/colors'
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
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;

  & img {
    --v: 50%;
    max-height: calc(100vh - 140px);
    box-shadow: 0px 3px 20px #000000cc;
    border-radius: 12px;
    mask-image: linear-gradient(
      transparent calc(50% - 40px - var(--v)),
      black calc(50% - var(--v)),
      black calc(50% + var(--v)),
      transparent calc(50% + 40px + var(--v))
    );
  }
`

export default function ArtistShareScene() {
  const rewindData = useRewindData()

  const { t } = useTranslation()

  if (!rewindData) {
    return null
  }

  const palette = Palettes[rewindData.artists.items[0].image.palette ?? 'Black']

  return (
    <Centered>
      <Container>
        <h2>
          You spent so much time with this artist that you should spread your
          love for them
        </h2>
        <ImageContainer>
          <img src="https://media.discordapp.net/attachments/937575765753597972/1044088208453017610/image.png?width=337&height=598" />
          <Button background={palette.color || undefined}>DOWNLOAD</Button>
        </ImageContainer>
      </Container>
    </Centered>
  )
}
