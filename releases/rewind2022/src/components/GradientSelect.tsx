import styled from '@emotion/styled'
import { Palette } from '../theme/colors'

export const GradientSelect = styled.button<{ palette: Palette }>`
  width: 42px;
  height: 42px;
  border-radius: 100%;
  background: linear-gradient(
    135deg,
    ${(p) => p.palette.gradient[0]},
    ${(p) => p.palette.gradient[1]}
  );
  border: 5px solid ${(p) => p.palette.color};
  box-shadow: 0px 1px 11px 2px rgba(0, 0, 0, 0.34);
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    width: 36px;
    height: 36px;
    border-width: 4px;
  }

  @media only screen and (max-height: 650px) {
    width: 36px;
    height: 36px;
    border-width: 4px;
  }
`
