import styled from '@emotion/styled'

export const IconButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 0 0 0px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  border: none;
  background: transparent;
  transition: all 150ms ease-in-out;
  cursor: pointer;

  &:hover {
    background: rgb(255 255 255 / 10%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: no-drop;
  }

  &:disabled:hover {
    background: transparent;
  }

  & > svg {
    width: 20px;
    height: 20px;
  }
`
