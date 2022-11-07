import styled from '@emotion/styled'
import { ReactComponent as LogoComponent } from '../assets/logo.svg'
import { ReactComponent as LanguageIcon } from '../assets/icons/language.svg'

const Positioned = styled.div<{ left?: string; right?: string }>`
  position: absolute;
  top: var(--margin);
  left: ${(p) => p.left};
  right: ${(p) => p.right};
`

const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  margin: 0;
  padding: 3px;
  height: auto;
  display: flex;
  transition: 100ms ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`

export default function Overlay() {
  return (
    <>
      <Positioned left="var(--margin)">
        <LogoComponent />
      </Positioned>
      <Positioned right="var(--margin)">
        <IconButton aria-label="change language" onClick={console.log}>
          <LanguageIcon />
        </IconButton>
      </Positioned>
    </>
  )
}
