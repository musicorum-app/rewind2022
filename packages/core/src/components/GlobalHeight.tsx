import { css, Global } from '@emotion/react'
import useWindowSize from '../hooks/useWindowSize'

export default function Globalheight() {
  const size = useWindowSize()

  const globalStyle = css`
    :root {
      --h: ${size[1]}px;
      --vh: ${Math.round(size[1] / 100)}px;
    }

    body {
      height: var(--h);
      position: fixed;
      top: 0;
      left: 0;
    }

    html {
      height: var(--h);
    }
  `

  return <Global styles={globalStyle} />
}
