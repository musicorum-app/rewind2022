import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { Chart } from './Chart'

const Digit = styled.span`
  font-size: 0.5em;
  font-variation-settings: 'wght' 900;
  margin: 0;
  line-height: 0.5em;
  width: calc(115px / 2);
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 700px) {
    width: calc(78px / 2);
  }

  @media only screen and (max-width: 460px) {
    width: calc(58px / 2);
  }
`

const CountContainer = styled.div`
  position: absolute;
  top: 100px;
  font-size: 182px;
  @media only screen and (max-width: 1030px) {
    top: 60px;
  }
  @media only screen and (max-height: 700px) {
    top: 60px;
  }

  @media only screen and (max-width: 700px) {
    font-size: 120px;
  }

  @media only screen and (max-width: 460px) {
    font-size: 90px;
  }
`

const CountCopy = styled(Digit)`
  display: flex;
  width: auto !important;
`

const ComplementaryText = styled.h2`
  font-size: 20px;
  margin: 0;
  margin-bottom: 1rem;
  text-align: center;
`

export default function ScrobblesChartScene() {
  const rewindData = useRewindData()

  if (!rewindData) {
    return null
  }

  return (
    <Centered column>
      <CountContainer>
        <CountCopy>
          {rewindData.scrobbles.total
            .toString()
            .split('')
            .map((d) => (
              <Digit>{d}</Digit>
            ))}
        </CountCopy>
        <ComplementaryText>scrobbles this year</ComplementaryText>
      </CountContainer>
      <Chart rewindData={rewindData} />
    </Centered>
  )
}
