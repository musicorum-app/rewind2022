import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { useRef, useMemo, useEffect } from 'react'
import { yearSplashObjects, yearSplashSheet } from './yearSplashSheet'
import { Palettes } from '../../theme/colors'
import { useSheetObjectValueUpdate } from '@rewind/core/src/hooks/useSheetObjectValueUpdate'
import { useMainControllerObjectObserver } from '../../modules/sheets'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import {
  getImage,
  ImageType,
  imageTypeDefaultImages
} from '../../modules/lastfmImage'
import PositionReferenceObject from '../../components/PositionReferenceObject'

const MainYear = styled.div`
  font-variation-settings: 'wght' 800;
  display: flex !important;
  font-size: 220px;
  transform-style: preserve-3d;
  line-height: 170px;
  text-shadow: 0px 3px 20px #00000055;
`

const BackImage = styled.img`
  &,
  & > div {
    position: absolute;
    transform-origin: right bottom;
    width: 110px;
    height: 110px;
    border-radius: 4px;
  }
`

const YearDigit = styled.div``

const BottomText = styled.h2`
  text-shadow: 0px 3px 20px #000000cc;
`

const digitChangeCallback = (values: { weight: number }, el: HTMLElement) => {
  el.style.fontVariationSettings = `'wght' ${values.weight}`
}

const defaultTrackImage = imageTypeDefaultImages[ImageType.TRACK]

export default function YearSplashScene() {
  const rewindData = useRewindData()
  const yearGroupRef = useRef<HTMLHeadingElement>(null)
  const bottomTextRef = useRef<HTMLHeadingElement>(null)

  const yearDigit1Ref = useRef<HTMLDivElement>(null)
  const yearDigit2Ref = useRef<HTMLDivElement>(null)
  const yearDigit3Ref = useRef<HTMLDivElement>(null)
  const yearDigit4Ref = useRef<HTMLDivElement>(null)

  const backImage1Ref = useRef<HTMLImageElement>(null)
  const backImage2Ref = useRef<HTMLImageElement>(null)
  const backImage3Ref = useRef<HTMLImageElement>(null)
  const backImage4Ref = useRef<HTMLImageElement>(null)
  const backImage5Ref = useRef<HTMLImageElement>(null)

  const { t } = useTranslation()

  useSheetObjectValueUpdate(yearGroupRef, yearSplashObjects.yearGroupObject)
  useSheetObjectValueUpdate(bottomTextRef, yearSplashObjects.bottomTextObject)

  useSheetObjectValueUpdate(
    yearDigit1Ref,
    yearSplashObjects.yearDigit1Object,
    digitChangeCallback
  )

  useSheetObjectValueUpdate(
    yearDigit2Ref,
    yearSplashObjects.yearDigit2Object,
    digitChangeCallback
  )

  useSheetObjectValueUpdate(
    yearDigit3Ref,
    yearSplashObjects.yearDigit3Object,
    digitChangeCallback
  )

  useSheetObjectValueUpdate(
    yearDigit4Ref,
    yearSplashObjects.yearDigit4Object,
    digitChangeCallback
  )

  useSheetObjectValueUpdate(backImage1Ref, yearSplashObjects.backImage1Object)
  useSheetObjectValueUpdate(backImage2Ref, yearSplashObjects.backImage2Object)
  useSheetObjectValueUpdate(backImage3Ref, yearSplashObjects.backImage3Object)
  useSheetObjectValueUpdate(backImage4Ref, yearSplashObjects.backImage4Object)
  useSheetObjectValueUpdate(backImage5Ref, yearSplashObjects.backImage5Object)

  const toGradient = useMemo(() => {
    const targetPalette = rewindData?.firstScrobbles[0].image.palette
    return targetPalette
      ? Palettes[targetPalette].gradient
      : Palettes.Burn.gradient
  }, [rewindData])

  const { pointerEvents } = useMainControllerObjectObserver(
    yearSplashObjects.mainObject,
    Palettes.MidnightSky.gradient,
    toGradient
  )

  useEffect(() => {
    yearSplashSheet.sequence.play()

    return () => yearSplashSheet.sequence.pause()
  }, [])

  if (!rewindData) return null

  return (
    <Centered
      is3D
      style={{
        pointerEvents: pointerEvents ? 'unset' : 'none',
        overflow: 'unset',
        flexDirection: 'column'
      }}
    >
      <MainYear ref={yearGroupRef}>
        <YearDigit ref={yearDigit1Ref}>2</YearDigit>
        <YearDigit ref={yearDigit2Ref}>0</YearDigit>
        <YearDigit ref={yearDigit3Ref}>2</YearDigit>
        <YearDigit ref={yearDigit4Ref}>2</YearDigit>
      </MainYear>
      <BottomText ref={bottomTextRef}>{t('year_splash.welcome')}</BottomText>

      <BackImage
        ref={backImage1Ref}
        src={getImage(rewindData.firstScrobbles[3].image) ?? defaultTrackImage}
      />

      <BackImage
        ref={backImage2Ref}
        src={getImage(rewindData.firstScrobbles[1].image) ?? defaultTrackImage}
      />
      <BackImage
        ref={backImage3Ref}
        src={getImage(rewindData.firstScrobbles[2].image) ?? defaultTrackImage}
      />
      <BackImage
        as={'div'}
        ref={backImage4Ref}
        // src={
        //   getImage(rewindData.firstScrobbles[0].image, 700) ?? defaultTrackImage
        // }
      >
        <PositionReferenceObject
          id="year-splash-track-ref"
          refTo="first-track-ref"
        />
      </BackImage>
      <BackImage
        ref={backImage5Ref}
        src={getImage(rewindData.firstScrobbles[4].image) ?? defaultTrackImage}
      />
    </Centered>
  )
}
