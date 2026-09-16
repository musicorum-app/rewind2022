import styled from '@emotion/styled'

export const TextInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid white;
  padding: 10px 15px;
  margin: 20px 0;
  border-radius: 200px;
  color: white;
  font-weight: 500;
  font-size: 20px;
  transition: all 160ms ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: white;
    opacity: 0.5;
    font-weight: 500;
  }
`
