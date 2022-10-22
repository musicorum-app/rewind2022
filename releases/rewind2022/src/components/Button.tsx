import styled from '@emotion/styled'
import chroma from 'chroma-js'
import { Palette } from '../theme/colors'

export interface ButtonProps {
  background?: string
  color?: string
}

const Button = styled.button<ButtonProps>`
  background: ${(p) => p.background ?? Palette.SweetWine};
  border-radius: 200px;
  color: ${(p) => p.color ?? 'white'};
  font-size: 18px;
  font-weight: 700;
  padding: 10px 35px;
  text-transform: uppercase;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 140ms linear;

  &:hover {
    background: ${(p) =>
      chroma(p.background ?? Palette.SweetWine)
        .darken(0.2)
        .hex()};
    transform: scale(1.05);
  }

  &:focus {
    background: ${(p) =>
      chroma(p.background ?? Palette.SweetWine)
        .darken(0.8)
        .hex()};
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
  }
`

export default Button
