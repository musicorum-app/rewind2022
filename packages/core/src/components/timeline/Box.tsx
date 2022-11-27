import styled from '@emotion/styled'

export const Box = styled.div<{ opened: boolean }>`
  background: var(--background);

  margin: 10px 28px;
  margin-right: 4px;
  max-width: 1024px;
  width: 100%;
  pointer-events: all;
  border: 2px solid var(--border);
  border-radius: var(--border-radius);
  padding: 8px 20px;

  box-shadow: 4px 4px 10px rgb(0 0 0 / 30%);
  backdrop-filter: blur(30px);
  transform: translateY(${(p) => (p.opened ? 0 : 'calc(100% + 20px)')});
  transition: transform 300ms ease-in-out;

  display: flex;
  justify-content: center;

  & > div {
  }
`
