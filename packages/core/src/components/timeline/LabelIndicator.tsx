import styled from '@emotion/styled'
import { CSSProperties } from 'react'
import LabelArrow from './LabelArrow'

const Indicator = styled.div`
  position: absolute;
  left: var(--position);
  height: 100%;
  pointer-events: none;
  display: flex;

  & .line {
    height: 100%;
    width: 1px;
    background: #007bff77;
    z-index: -100;
  }

  & .name {
    font-size: 9px;
    transform: translateX(-2px) translateY(-5px);
    height: 13px;
    display: flex;

    & .arrow-right {
      transform: rotate(-180deg);
    }

    & span {
      height: 12px;
      position: relative;
      background: #007bff;
    }
  }
`

interface LabelIndicatorProps {
  name: string
  position: number
}

export default function LabelIndicator({
  name,
  position
}: LabelIndicatorProps) {
  return (
    <Indicator
      style={
        {
          '--position': position * 100 + '%'
        } as CSSProperties
      }
    >
      <div className="line" />
      <div className="name">
        <LabelArrow />
        <span>{name}</span>
        <LabelArrow className="arrow-right" />
      </div>
    </Indicator>
  )
}
