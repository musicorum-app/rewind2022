import styled from '@emotion/styled'

const Container = styled.div<{ color: string }>`
  position: relative;

  & > img {
    width: 97%;
    height: 97%;
    z-index: 10;
    border-radius: 8px;
    object-fit: cover;
    transition: transform 150ms ease-in-out;
  }

  & > div {
    background: ${(p) => p.color};
    width: 97%;
    height: 97%;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
    border-radius: 11px;

    transition: transform 150ms ease-in-out;
  }

  &:hover {
    & > img {
      transform: translate(-2px, -2px);
    }
    & > div {
      transform: translate(2px, 2px);
    }
  }
`

interface ImageWithBorderProps {
  src: string
  color: string
}

export default function ImageWithBorder(props: ImageWithBorderProps) {
  return (
    <Container color={props.color} className="image">
      <div />
      <img src={props.src} />
    </Container>
  )
}
