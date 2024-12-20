import styled from '@emotion/styled'

export const SceneHeader = styled.h1<{ color?: string }>`
  position: absolute;
  left: var(--margin);
  top: calc(var(--margin) + 30px);
  margin: 0;
  font-variation-settings: 'wght' 750;
  font-size: 3.2em;
  color: ${(p) => p.color || 'inherit'};
`
