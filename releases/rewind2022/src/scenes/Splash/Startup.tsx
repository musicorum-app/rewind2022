import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'

const Text = styled.h1`
  margin: 0;
  text-align: center;
  font-size: clamp(20px, 6vw, 90px);
  line-height: 105%;
`

const ContinueButton = styled.button`
  margin-top: 50px;
  padding: 8px 20px;
`

export default function Startup() {
  return (
    <Centered
      style={{
        flexDirection: 'column'
      }}
    >
      <Text>That moment has come</Text>
      <Text>to rewind your 2022 in music</Text>

      <ContinueButton>foo bar</ContinueButton>
    </Centered>
  )
}
