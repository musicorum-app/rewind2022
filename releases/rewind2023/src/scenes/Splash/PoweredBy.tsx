import styled from '@emotion/styled'
import Flex from '@react-css/flex'
import Centered from '@rewind/core/src/components/Centered'
import { ReactComponent } from './assets/poweredSources.svg'

const PoweredSources = styled(ReactComponent)`
  margin-top: 10px;
  width: 220px;
  height: auto;
`

export default function PoweredBy() {
  return (
    <Centered id="splash-powered-by">
      <Flex column alignItemsCenter>
        <b>Powered by</b>
        <PoweredSources />
      </Flex>
    </Centered>
  )
}
