import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { Chart } from './Chart'

const Digit = styled.span`
  font-size: calc(12rem / 2);
  font-variation-settings: 'wght' 900;
  margin: 0;
  line-height: calc(12rem / 2);
  width: calc(112px / 2);
  display: flex;
  justify-content: center;
`

const CountContainer = styled.div`
  position: absolute;
  top: 100px;
  @media only screen and (max-width: 1030px) {
    top: 60px;
  }
  @media only screen and (max-height: 700px) {
    top: 60px;
  }
`

const CountCopy = styled(Digit)`
  display: flex;
  width: unset;
`

const ComplementaryText = styled.h2`
  font-size: 1.6em;
  margin: 0;
  margin-bottom: 2rem;
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
