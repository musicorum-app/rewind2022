import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { useRef, useMemo, useEffect } from 'react'
import { Palettes } from '../../theme/colors'
import { useSheetObjectValueUpdate } from '@rewind/core/src/hooks/useSheetObjectValueUpdate'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import {
  getImage,
  ImageType,
  imageTypeDefaultImages
} from '../../modules/lastfmImage'
import PositionReferenceObject from '../../components/PositionReferenceObject'
import { useDomSheetObjectValueUpdate } from '@rewind/core/src/hooks/useDomSheetObjectValueUpdate'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { yearSplashForwardTimeline } from './yearSplashTimeline'
import { useTimelineController } from '../../hooks/useTimelineController'

const MainYear = styled.div`
  font-variation-settings: 'wght' 800;
  display: flex !important;
  font-size: 220px;
  transform-style: preserve-3d;
  line-height: 170px;
  text-shadow: 0px 3px 20px #00000055;
`

const BackImage = styled.img<{ transform: string }>`
  &,
  & > div {
    position: absolute;
    transform-origin: right bottom;
    width: 110px;
    height: 110px;
    border-radius: 4px;
    transform: translate3d(${(p) => p.transform});
    box-shadow: 0px 3px 20px #00000088;
  }
`

const YearDigit = styled.div<{ z?: number }>`
  --weight: 300;
  font-variation-settings: 'wght' var(--weight);
  transform: translateZ(${(p) => p.z || 0}px);
`

const BottomText = styled.h2`
  text-shadow: 0px 3px 20px #000000cc;
  font-size: 1.8em;
`

const digitChangeCallback = (values: { weight: number }, el: HTMLElement) => {
  el.style.fontVariationSettings = `'wght' ${values.weight}`
}

const defaultTrackImage = imageTypeDefaultImages[ImageType.TRACK]

export default function YearSplashScene() {
  const rewindData = useRewindData()

  const setTimeline = useTimelineController((s) => s.setTimeline)

  const containerRef = useRef<HTMLDivElement>(null)

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

  // useDomSheetObjectValueUpdate(yearGroupRef, yearSplashObjects.yearGroupObject)
  // useDomSheetObjectValueUpdate(
  //   bottomTextRef,
  //   yearSplashObjects.bottomTextObject
  // )

  // useDomSheetObjectValueUpdate(
  //   yearDigit1Ref,
  //   yearSplashObjects.yearDigit1Object,
  //   digitChangeCallback
  // )

  // useDomSheetObjectValueUpdate(
  //   yearDigit2Ref,
  //   yearSplashObjects.yearDigit2Object,
  //   digitChangeCallback
  // )

  // useDomSheetObjectValueUpdate(
  //   yearDigit3Ref,
  //   yearSplashObjects.yearDigit3Object,
  //   digitChangeCallback
  // )

  // useDomSheetObjectValueUpdate(
  //   yearDigit4Ref,
  //   yearSplashObjects.yearDigit4Object,
  //   digitChangeCallback
  // )

  // useDomSheetObjectValueUpdate(
  //   backImage1Ref,
  //   yearSplashObjects.backImage1Object
  // )

  // useDomSheetObjectValueUpdate(
  //   backImage2Ref,
  //   yearSplashObjects.backImage2Object
  // )
  // useDomSheetObjectValueUpdate(
  //   backImage3Ref,
  //   yearSplashObjects.backImage3Object
  // )
  // useDomSheetObjectValueUpdate(
  //   backImage4Ref,
  //   yearSplashObjects.backImage4Object
  // )
  // useDomSheetObjectValueUpdate(
  //   backImage5Ref,
  //   yearSplashObjects.backImage5Object
  // )

  const toGradient = useMemo(() => {
    const targetPalette = rewindData?.firstScrobbles.items[0].image.palette
    return targetPalette
      ? Palettes[targetPalette].gradient
      : Palettes.Burn.gradient
  }, [rewindData])

  useEffect(() => {
    if (!yearGroupRef.current) return
    const tl = yearSplashForwardTimeline(toGradient)
    setTimeline(tl)
    console.log(tl)
    tl.play()
    // yearSplashForwardTimeline.play()
    // yearSplashForwardSheet.sequence.play()
    // return () => yearSplashForwardSheet.sequence.pause()
  }, [yearGroupRef.current])

  if (!rewindData) return null

  return (
    <Centered
      is3D
      style={{
        overflow: 'unset',
        flexDirection: 'column'
      }}
      ref={containerRef}
      id="ysp"
    >
      <MainYear className="main-year" ref={yearGroupRef}>
        <YearDigit className="digit" ref={yearDigit1Ref}>
          2
        </YearDigit>
        <YearDigit z={2} className="digit" ref={yearDigit2Ref}>
          0
        </YearDigit>
        <YearDigit className="digit" ref={yearDigit3Ref}>
          2
        </YearDigit>
        <YearDigit z={-2} className="digit" ref={yearDigit4Ref}>
          2
        </YearDigit>
      </MainYear>
      <BottomText className="bottom-text" ref={bottomTextRef}>
        {t('year_splash.welcome')}
      </BottomText>

      <BackImage
        ref={backImage1Ref}
        transform="165px, -134px, -1px"
        className="back-image-1"
        src={
          getImage(rewindData.firstScrobbles.items[3].image) ??
          defaultTrackImage
        }
      />

      <BackImage
        ref={backImage2Ref}
        transform="-210px, 85px, -10px"
        className="back-image-2"
        src={
          getImage(rewindData.firstScrobbles.items[1].image) ??
          defaultTrackImage
        }
      />
      <BackImage
        ref={backImage3Ref}
        transform="5px, -35px, 0px"
        className="back-image-3"
        src={
          getImage(rewindData.firstScrobbles.items[2].image) ??
          defaultTrackImage
        }
      />
      <BackImage
        transform="2px"
        as={'div'}
        style={{
          background: 'transparent',
          transform: 'translate(-274px, -70px)',
          boxShadow: 'none'
        }}
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
        transform="310px, 49px, -3px"
        className="back-image-5"
        src={
          getImage(rewindData.firstScrobbles.items[4].image) ??
          defaultTrackImage
        }
      />
    </Centered>
  )
}
