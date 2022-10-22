import styled from '@emotion/styled'
import Flex from '@react-css/flex'
import Centered from '@rewind/core/src/components/Centered'
import { ReactComponent } from './assets/poweredSources.svg'
import { useSplashSheet } from './useSplashSheet'

const PoweredSources = styled(ReactComponent)`
  margin-top: 10px;
  width: 220px;
  height: auto;
`

export default function PoweredBy() {
  const poweredValues = useSplashSheet((s) => s.poweredValues)
  return (
    <Centered>
      <Flex
        column
        alignItemsCenter
        style={{
          opacity: poweredValues.opacity,
          transform: `translateY(${poweredValues.y}px)`
        }}
      >
        <b>Powered by</b>
        <PoweredSources />
      </Flex>
    </Centered>
  )
}
