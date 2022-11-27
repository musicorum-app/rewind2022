import styled from '@emotion/styled'
import ImageWithBorder from './ImageWithBorder'

const Texts = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  --width: 220px;

  padding: 8px;
  width: var(--width);

  & .image {
    width: var(--width);
    height: var(--width);
  }

  & h2 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: var(--width);
    font-variation-settings: 'wght' 900;
    font-size: 20px;
    text-align: center;
    margin: 1rem 0 0.5rem 0;
  }

  & h5 {
    text-align: center;
    margin: 0;
    font-size: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media only screen and (max-width: 1060px) {
    --width: 100px;
    flex-direction: row;
    width: 100%;
    align-items: center;
    padding: 8px 12px;

    & ${Texts} {
      margin-left: 12px;
      width: 30vw;
    }

    & h2 {
      margin: 0;
    }

    & ${Texts} * {
      text-align: start;
      width: 100%;
    }
  }

  @media only screen and (max-width: 760px) {
    & ${Texts} {
      width: fit-content;
      max-width: calc(80vw - var(--width));
    }
  }

  @media only screen and (max-width: 760px) and (max-height: 650px) {
    --width: 60px;
  }
`

export interface TopItemProps {
  image?: string | null
  color: string
  title: string
  secondary: string
}

export default function TopItem(props: TopItemProps) {
  return (
    <Container>
      <ImageWithBorder src={props.image ?? ''} color={props.color} />
      <Texts>
        <h2>{props.title}</h2>
        <h5>{props.secondary}</h5>
      </Texts>
    </Container>
  )
}
