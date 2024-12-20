import styled from '@emotion/styled'
import { forwardRef } from 'react'
import { Palettes } from '../theme/colors'

export interface ProgressBarProps {
  value: number
  color: string
}

const LoadingBar = styled.div<ProgressBarProps>`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  height: 6px;
  width: 100%;
  overflow: hidden;

  & > div {
    background: ${(p) => p.color};
    width: ${(p) => p.value}%;
    height: 100%;
    border-radius: 20px;
    transition: all 350ms ease-in-out;
  }
`

const ProgressBar = forwardRef<HTMLDivElement, Partial<ProgressBarProps>>(
  (props, ref) => {
    return (
      <LoadingBar
        ref={ref}
        color={props.color ?? Palettes.Gold.color}
        value={props.value ?? 0}
      >
        <div aria-valuenow={props.value ?? 0} />
      </LoadingBar>
    )
  }
)

export default ProgressBar
