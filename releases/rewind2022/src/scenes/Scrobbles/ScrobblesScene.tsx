import styled from '@emotion/styled'
import Centered from '@rewind/core/src/components/Centered'
import { useRewindData } from '../Resolve/useDataResolve'
import { useEffect, useMemo } from 'react'
import { interpolateBackgroundGradient } from '../../modules/backgroundGradient'
import { Palettes } from '../../theme/colors'

/**
 *    | 9 | 9 | 8
 *    | 9 | 9 | 9
 *  1 | 0 | 0 | 0
 *
 * ```ts
 * let exampleArr = [
 *  [' ', ' ', '1'],
 *  ['9', '9', '0'],
 *  ['9', '9', '0'],
 *  ['8', '9', '0']
 * ]
 * ```
 */
type ScrobbleListMap = string[][]

const ScrobbleListContainer = styled.div`
  position: absolute;
`

const ScrobbleList = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  align-items: flex-end;
  bottom: calc(50vh - 6rem);
`

const Line = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const Digit = styled.h1`
  font-size: 12rem;
  font-variation-settings: 'wght' 900;
  margin: 0;
  line-height: 12rem;
`

export default function ScrobblesScene() {
  const rewindData = useRewindData()

  useEffect(() => {
    interpolateBackgroundGradient(
      Palettes.MidnightSky.gradient,
      Palettes.DisplacedOcean.gradient,
      1
    )
  }, [])

  const scrobblesList = useMemo(() => {
    if (!rewindData) return null
    const list = new Array(12)
      .fill(1)
      .map((_, i) => rewindData.scrobbles.total - i)

    const length = list.at(-1)!.toString().length
    const lines: ScrobbleListMap = new Array(length)
      .fill([])
      .map(() => new Array(list.length).fill(' '))

    for (let i = 0; i < list.length; i++) {
      const count = list[i].toString().padStart(length, ' ')
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j]
        line[i] = count[j]
      }
    }

    return lines
  }, [rewindData])

  if (!rewindData) {
    return null
  }

  return (
    <Centered>
      {scrobblesList && (
        <ScrobbleList>
          {scrobblesList.map((line, i) => (
            <Line key={i}>
              {line.map((digit, i) => (
                <Digit key={i}>{digit}</Digit>
              ))}
            </Line>
          ))}
        </ScrobbleList>
      )}
    </Centered>
  )
}
