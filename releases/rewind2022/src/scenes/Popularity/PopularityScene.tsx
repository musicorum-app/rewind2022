import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useEffect, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import ImageWithBorder from '../../components/ImageWithBorder'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palettes, PaletteType } from '../../theme/colors'
import { useRewindData } from '../Resolve/useDataResolve'

const Container = styled.div`
  --item-w: 440px;

  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 60px;
  padding-bottom: 120px;

  & h5 {
    font-size: 23px;
    text-align: center;
    margin: 0;
    @media only screen and (max-width: 1500px) {
      font-size: 18px;
    }
  }

  @media only screen and (max-width: 1500px) {
    --item-w: 300px;
  }

  @media only screen and (max-height: 800px) {
    --item-w: 300px;
  }

  @media only screen and (max-width: 1130px) {
    flex-direction: column;
    gap: 24px;
  }

  @media only screen and (max-height: 1200px) and (max-width: 1130px) {
    --item-w: 240px;
  }

  @media only screen and (max-height: 930px) and (max-width: 1130px) {
    --item-w: 200px;
    gap: 20px;

    h5 {
      font-size: 14px;
    }
  }

  @media only screen and (max-height: 760px) and (max-width: 1130px) {
    --item-w: 180px;
  }

  @media only screen and (max-height: 770px) and (max-width: 1130px) {
    --item-w: 110px;
  }

  @media only screen and (max-height: 650px) {
    --item-w: 90px;

    h5 {
      font-size: 12px;
    }
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  align-items: center;
  width: var(--item-w);
  max-width: calc(100vw - 80px);

  & .image {
    width: var(--item-w);
    height: var(--item-w);
  }

  & span {
    text-shadow: 1px 1px 20px rgb(0 0 0 / 80%);

    & b {
      font-variation-settings: 'wght' 800;
    }
  }

  @media only screen and (max-height: 930px) and (max-width: 1130px) {
    width: calc(var(--item-w) + 120px);
    gap: 8px;
    font-size: 15px;
  }

  @media only screen and (max-height: 650px) {
    gap: 6px;
    font-size: 12px;
  }
`

const NumberText = styled.h2`
  font-size: 150px;
  line-height: 220px;
  transform: scale(2);
  z-index: 20;
  font-variation-settings: 'wght' 900;
  margin: 0;
  text-shadow: 1px 1px 44px rgb(0 0 0 / 50%);

  @media only screen and (max-width: 1500px) {
    transform: scale(1.6);
    line-height: 120px;
  }

  @media only screen and (max-height: 800px) {
    transform: scale(1.4);
    line-height: 150px;
  }

  @media only screen and (max-width: 1130px) {
    transform: scale(1);
    font-size: 80px;
    line-height: 50px;
  }

  @media only screen and (max-height: 930px) and (max-width: 1130px) {
    font-size: 60px;
    line-height: 30px;
  }
`

const Note = styled.span`
  position: absolute;
  left: var(--margin);
  bottom: 80px;
  font-size: 13px;
  text-shadow: 1px 1px 20px rgb(0 0 0 / 80%);

  @media only screen and (max-height: 650px) {
    font-size: 9px;
  }
`

export default function PopularityScene() {
  const rewindData = useRewindData()

  const { t } = useTranslation()

  const mainPalette = useMemo(() => {
    return Palettes[
      rewindData?.artists.popularity.high?.image.palette ?? PaletteType.Black
    ]
  }, [rewindData])

  useEffect(() => {
    // interpolateBackgroundGradient(mainPalette.gradient, mainPalette.gradient, 1)
  }, [rewindData])

  if (!rewindData) {
    return null
  }

  return (
    <Centered column>
      <Container>
        <Item>
          <ImageWithBorder
            src={rewindData.artists.popularity.low?.image.url ?? ''}
            color={mainPalette.color}
          />
          <span>
            <Trans
              i18nKey={`popularity.low`}
              values={{
                name: rewindData.artists.popularity.low?.name,
                value: rewindData.artists.popularity.low?.resource?.popularity
              }}
              components={[<b></b>]}
            />
          </span>
        </Item>
        <Item>
          <NumberText>
            {Math.round(rewindData.artists.popularity.average)}%
          </NumberText>
          <h5>{t('popularity.subtitle')}</h5>
        </Item>
        <Item>
          <ImageWithBorder
            src={rewindData.artists.popularity.high?.image.url ?? ''}
            color={mainPalette.color}
          />
          <span>
            <Trans
              i18nKey={`popularity.high`}
              values={{
                name: rewindData.artists.popularity.high?.name,
                value: rewindData.artists.popularity.high?.resource?.popularity
              }}
              components={[<b></b>]}
            />
          </span>
        </Item>
      </Container>
      <Note>{t('popularity.note')}</Note>
    </Centered>
  )
}
