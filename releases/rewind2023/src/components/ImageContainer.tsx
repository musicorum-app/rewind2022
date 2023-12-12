import styled from '@emotion/styled'

const ImageWrapper = styled.div`
  aspect-ratio: 1 / 1;
  background: var(--scene-main-color);
  clip-path: inset(0 var(--image-container-clip-percent, 100%) 0 0);
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: content-box;
  display: block;
  clip-path: inset(0 var(--image-container-image-clip-percent, 100%) 0 0);
`

interface ImageContainerProps {
  src: string
  className?: string
}

export function ImageContainer({ src, className }: ImageContainerProps) {
  return (
    <ImageWrapper className={className}>
      <Image src={src} />
    </ImageWrapper>
  )
}
