import styled from '@emotion/styled'
import { ReactComponent as LoadingIcon } from '../assets/loading.svg'

export const LoadingIndicator = styled(LoadingIcon)`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  & {
    animation: rotate 1.7s linear infinite;
  }
`
