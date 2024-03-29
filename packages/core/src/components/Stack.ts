import styled from '@emotion/styled'

const Stack = styled.div`
  position: relative;
  width: 100vw;
  height: var(--h);
  overflow: hidden;
  & > * {
    position: absolute;
    top: 0px;
    left: 0px;
  }
`

export default Stack
