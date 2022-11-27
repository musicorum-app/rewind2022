import styled from '@emotion/styled'

export const Container = styled.div`
  &,
  & * {
    --background: rgb(17 17 17 / 80%);
    --border: rgb(255 255 255 / 14%);
    --border-radius: 12px;
    --color: #007bff;
  }

  width: 100vw;
  position: absolute;
  bottom: 0px;
  pointer-events: none;
  display: flex;
  justify-content: center;
  overflow: hidden;
`
