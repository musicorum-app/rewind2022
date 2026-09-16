import { Image as ChakraImage, ImageProps } from '@chakra-ui/image'
import styled from '@emotion/styled'

const ImageWrapper = styled.div`
  aspect-ratio: 1 / 1;
  background: var(--scene-main-color);
  clip-path: inset(0 var(--image-container-clip-percent, 100%) 0 0);
`

const Image = styled(ChakraImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: content-box;
  display: block;
  clip-path: inset(0 var(--image-container-image-clip-percent, 100%) 0 0);
`

export function ImageContainer({ className, ...props }: ImageProps) {
  return (
    <ImageWrapper className={className}>
      <Image {...props} />
    </ImageWrapper>
  )
}
