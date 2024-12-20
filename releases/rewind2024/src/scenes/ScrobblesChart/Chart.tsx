import styled from '@emotion/styled'
import { RewindData2023 } from '../../modules/rewindDataExtras'
import { months } from '@rewind/resolver/src/types'
import { useRef, useLayoutEffect, useMemo, useState } from 'react'
import useWindowResize from '@rewind/core/src/hooks/useWindowResize'
import useWindowSize from '@rewind/core/src/hooks/useWindowSize'
import { mapValue } from '@rewind/core/src/utils'
import { Palettes } from '../../theme/colors'
import { useMediaQuery } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import 'core-js/features/array/at'

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  margin: calc(var(--margin) * 2);
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  opacity: 0;

  @media only screen and (max-height: 700px) {
    position: absolute;
    top: 180px;
  }

  @media only screen and (max-width: 1030px) and (max-height: 700px) {
    position: absolute;
    top: 180px;
  }

  & .max-value {
    transform: translateY(-0.6em);
    display: flex;
    align-items: center;
    height: 22px;
    position: absolute;
    transform: translate(-8px, -12px);

    @media only screen and (max-width: 800px) {
      transform: translate(-22px, -12px);
    }
  }

  & .max-value div {
    width: 20px;
    height: 1px;
    background: white;
    border: none;
    margin-left: 4px;
  }
`

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`

const MonthsList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  position: relative;
`

const Line = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;

  & .line {
    height: 200px;
    width: 1px;
    background: rgb(255 255 255 / 20%);
  }
`

const MonthName = styled.div`
  width: 100%;
  border-top: 2px solid white;
  height: 25px;
`

const SVGLayer = styled.svg`
  position: absolute;

  & polyline {
    stroke-dasharray: 1;
  }
`

export interface ChartProps {
  rewindData: RewindData2023
}

export function Chart({ rewindData }: ChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGPolylineElement>(null)

  const [size, setSize] = useState([10, 10] as [number, number])
  const [points, setPoints] = useState<number[][]>([])

  const [small] = useMediaQuery('(max-width: 600px)')

  const windowSize = useWindowSize()
  const { t } = useTranslation()

  const maxValue = useMemo(
    () => Object.values(rewindData.scrobbles.months).sort((a, b) => b - a)[0],
    [rewindData]
  )

  let monthNames = months.map((m) => t(`months.${m}`))
  monthNames = small ? monthNames.map((m) => m.at(0)!) : monthNames

  useLayoutEffect(() => {
    const svg = svgRef.current
    const line = lineRef.current
    if (svg && line) {
      const parent = svg.parentElement
      const bounding = parent!.getBoundingClientRect()
      setSize([bounding.width, bounding.height])
      const points: [number, number][] = []

      const maxHeight = bounding.height
      const xPiece = bounding.width / 12

      for (let i = 0; i < months.length; i++) {
        const month = months[i]
        const scrobbles = rewindData.scrobbles.months[month]
        const x = xPiece * i
        const y = mapValue(scrobbles, [0, maxValue], [maxHeight - 30, 8])

        points.push([x + xPiece / 2, y])
      }

      setPoints(points)
    }
  }, [windowSize, svgRef, lineRef, maxValue])

  return (
    <Container className="chart">
      <div className="max-value">
        {maxValue} <div />
      </div>
      <InnerContainer>
        <MonthsList>
          {monthNames.map((m, index) => (
            <Line key={index}>
              <div className="line" />
              <MonthName className="month-name">{m}</MonthName>
            </Line>
          ))}
        </MonthsList>
        <SVGLayer
          ref={svgRef}
          width={size[0]}
          height={size[1]}
          viewBox={`0 0 ${size[0]} ${size[1]}`}
        >
          <polyline
            ref={lineRef}
            points={points.map((p) => p.join()).join(' ')}
            fill="transparent"
            strokeWidth={2}
            stroke={Palettes.Gold.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
          />
          {points.map((p, index) => (
            <circle
              cx={p[0]}
              cy={p[1]}
              key={index}
              r={4}
              fill={Palettes.Gold.color}
            />
          ))}
        </SVGLayer>
      </InnerContainer>
    </Container>
  )
}
