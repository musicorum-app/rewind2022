import Centered from '@rewind/core/src/components/Centered'
import { ReactComponent as MusicorumPresentsAsset } from './assets/musicorumPresents.svg'
import { useSplashSheet } from './useSplashSheet'

interface Props {
  opacity: number
  y: number
}

export default function MusicorumPresents() {
  const presentsValues = useSplashSheet((s) => s.presentsValues)

  return (
    <Centered>
      <MusicorumPresentsAsset
        style={{
          opacity: presentsValues.opacity,
          transform: `translateY(${presentsValues.y}px)`
        }}
      />
    </Centered>
  )
}
