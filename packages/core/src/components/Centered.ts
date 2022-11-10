import styled from '@emotion/styled'

export interface CenteredProps {
  is3D?: boolean
  disablePointerEvents?: boolean
}

const Centered = styled.div<CenteredProps>`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transform-style: ${(p) => (p.is3D ? 'preserve-3d' : 'unset')};
  perspective: ${(p) => (p.is3D ? '400px' : 'unset')};
  pointer-events: ${(p) => (p.disablePointerEvents ? 'none' : 'unset')}; ;
`

export default Centered
