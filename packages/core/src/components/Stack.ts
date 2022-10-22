import styled from "@emotion/styled";

const Stack = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  & > * {
    position: absolute;
    top: 0px;
    left: 0px;
  }
`

export default Stack