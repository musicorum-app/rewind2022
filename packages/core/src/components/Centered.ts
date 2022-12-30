import styled from '@emotion/styled'

export interface CenteredProps {
  is3D?: boolean
  pointerEvents?: boolean
  column?: boolean
}

const Centered = styled.div<CenteredProps>`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: ${(p) => (p.column ? 'column' : 'unset')};
  transform-style: ${(p) => (p.is3D ? 'preserve-3d' : 'unset')};
  perspective: ${(p) => (p.is3D ? '400px' : 'unset')};
  pointer-events: ${(p) => (p.pointerEvents ? 'unset' : 'none')}; ;
`

export default Centered
