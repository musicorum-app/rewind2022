import styled from '@emotion/styled'
import { Palettes } from '../../theme/colors'

const Container = styled.div`
  min-width: 280px;
  max-width: 380px;
  width: 100%;
  margin-top: 10px;
  position: relative;
`

const IconContainer = styled.div`
  background: white;
  width: 42px;
  height: 42px;
  border-radius: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  & svg {
    width: 60%;
    height: 60%;
    stroke: ${Palettes.DisplacedOcean.color};
  }

  @media only screen and (max-width: 1030px) and (max-height: 730px) {
    width: 32px;
    height: 32px;
  }
`

const Box = styled.div`
  background: ${Palettes.DisplacedOcean.color};
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 24px 6px 8px;
  box-sizing: border-box;
  text-align: center;

  & span {
    text-transform: uppercase;
    color: rgb(0 0 0 / 55%);
    font-size: 1.1rem;
    font-variation-settings: 'wght' 900;
  }

  & h2 {
    color: black;
    font-variation-settings: 'wght' 900;
    margin: 0.25rem;
    font-size: 2rem;
  }

  & h5 {
    color: black;
    margin: 0;
    font-size: 1.3rem;
    font-variation-settings: 'wght' 500;
  }

  @media only screen and (max-width: 1030px) {
    & span {
      font-size: 1rem;
    }

    & h2 {
      font-size: 1.7rem;
      margin: 0rem;
    }

    & h5 {
      font-size: 1rem;
    }
  }

  @media only screen and (max-width: 1030px) and (max-height: 730px) {
    & {
      padding: 18px 2px 2px;
    }
    & span {
      font-size: 0.9rem;
    }

    & h2 {
      font-size: 1.2rem;
      margin: 0rem;
    }

    & h5 {
      font-size: 0.9rem;
    }
  }
`

export interface DetailItemProps {
  label: string
  title: string
  secondary: string
  children: React.ReactNode
}

export default function DetailItem(props: DetailItemProps) {
  return (
    <Container>
      <IconContainer>{props.children}</IconContainer>
      <Box>
        <span>{props.label}</span>
        <h2>{props.title}</h2>
        <h5>{props.secondary}</h5>
      </Box>
    </Container>
  )
}
