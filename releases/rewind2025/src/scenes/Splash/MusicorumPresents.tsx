import Centered from '@rewind/core/src/components/Centered'
import { ReactComponent as MusicorumPresentsAsset } from './assets/musicorumPresents.svg'

export default function MusicorumPresents() {
  return (
    <Centered id="splash-musicorum-presents" style={{ opacity: 0 }}>
      <MusicorumPresentsAsset />
    </Centered>
  )
}
