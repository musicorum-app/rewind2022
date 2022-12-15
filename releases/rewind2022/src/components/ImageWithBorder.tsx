import styled from '@emotion/styled'
import { forwardRef } from 'react'

const Container = styled.div<{ color: string }>`
  position: relative;
  pointer-events: all;
  display: flex;

  & > img {
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    z-index: 1;
    top: 0;
    left: 0;
    border-radius: 8px;
    object-fit: cover;
    transition: transform 150ms ease-in-out;
    pointer-events: none;
  }

  & > div {
    background: ${(p) => p.color};
    width: calc(100% - 8px);
    height: calc(100% - 8px);
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
    border-radius: 11px;
    transform-origin: bottom right;
    pointer-events: none;

    transition: transform 150ms ease-in-out;
  }

  &:hover {
    & > img {
      transform: translate(-2px, -2px) scale(0.98);
    }
    & > div {
      transform: translate(2px, 2px) scale(0.98);
    }
  }
`

interface ImageWithBorderProps {
  src: string
  color: string
  id?: string
}

const ImageWithBorder = forwardRef<HTMLDivElement, ImageWithBorderProps>(
  (props, ref) => {
    return (
      <Container ref={ref} id={props.id} color={props.color} className="image">
        <div />
        <img src={props.src} />
      </Container>
    )
  }
)

export default ImageWithBorder
