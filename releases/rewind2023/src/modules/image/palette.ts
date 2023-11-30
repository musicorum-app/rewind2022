import chroma from 'chroma-js'
import { Palettes, PaletteType } from '../../theme/colors'
import { extractImageColors } from '../image'

export async function getImagePalettes(image?: string) {
  const palettes = [
    PaletteType.Black,
    PaletteType.NatureGreen,
    PaletteType.Yellow,
    PaletteType.Orange,
    PaletteType.Wine,
    PaletteType.WeirdSky
  ]
  let index = 0

  if (!image) {
    return palettes
  }

  const colors = await extractImageColors(image, 20)
  if (!colors) return palettes

  for (const color of colors) {
    if (index === palettes.length - 1) {
      break
    }
    const palette = getClosestPalette(color.hex, true)

    console.log(palettes.includes(palette), palette)

    if (!palettes.includes(palette)) {
      palettes[index++] = palette
    }
  }

  console.log('AAAAAAAAAAAA', colors, palettes)

  return palettes
}

export function getClosestPalette(color: string, ignoreMain = true) {
  let availablePalettes = Object.values(PaletteType) as PaletteType[]
  if (ignoreMain) {
    availablePalettes = availablePalettes.filter(
      (p) =>
        ![
          PaletteType.Candy,
          PaletteType.MidnightSky,
          PaletteType.DisplacedOcean
        ].includes(p)
    )
  }

  if (import.meta.env.DEV) {
    console.log('* Distances')
  }

  const distances = availablePalettes
    .map((p) => {
      const palette = Palettes[p]
      const targetColors = palette.targetColors ?? [palette.color]

      const distances = targetColors.map((c) => chroma.deltaE(color, c))

      if (import.meta.env.DEV) {
        const colors = palette.gradient.join(', ')
        const textColor =
          chroma(palette.gradient[0]).luminance() > 0.5 ? 'black' : 'white'

        for (const c of targetColors) {
          const textColor2 = chroma(c).luminance() > 0.5 ? 'black' : 'white'
          console.log(
            `%c${p}%c <-> %c${chroma.deltaE(color, c).toFixed(2)}`,
            `color: ${textColor};background: linear-gradient(90deg, ${colors}); padding: 2px 5px`,
            'color: inherit',
            `color: ${textColor2};background: ${c}; padding: 2px 5px`
          )
        }

        console.log('Dist:', distances.sort((a, b) => a - b)[0])
      }

      return {
        palette: p,
        // get the lowest distance from the distances from target colors (if present)
        distance: distances.sort((a, b) => a - b)[0]
      }
    })
    .sort((a, b) => a.distance - b.distance)

  const palette = distances[0].palette

  if (import.meta.env.DEV) {
    console.log('Distances:', distances)
    const p = Palettes[palette]
    const colors = p.gradient.join(', ')
    const textColor =
      chroma(p.gradient[0]).luminance() > 0.5 ? 'black' : 'white'

    console.log(
      `Picked palette: %c${palette}%c - ${distances[0].distance}`,
      `color: ${textColor};background: linear-gradient(90deg, ${colors}); padding: 2px 14px`,
      'color: inherit'
    )
  }

  return palette
}
