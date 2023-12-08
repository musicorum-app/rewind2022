import styled from '@emotion/styled'
import chroma from 'chroma-js'
import { Palettes } from '../theme/colors'

export interface ButtonProps {
  background?: string
  color?: string
}

const Button = styled.button<ButtonProps>`
  background: ${(p) => p.background ?? Palettes.Candy.color};
  border-radius: 200px;
  color: ${(p) => p.color ?? 'white'};
  font-size: 17px;
  font-variation-settings: 'wght' 900;
  padding: 6px 30px;
  text-transform: uppercase;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 140ms linear;
  box-sizing: border-box;

  &:hover {
    background: ${(p) =>
      chroma(p.background ?? Palettes.Candy.color)
        .darken(0.8)
        .hex()};
    transform: scale(1.05) !important;
  }

  &:focus {
    background: ${(p) =>
      chroma(p.background ?? Palettes.Candy.color)
        .darken(0.8)
        .hex()};
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
  }
`

export default Button
