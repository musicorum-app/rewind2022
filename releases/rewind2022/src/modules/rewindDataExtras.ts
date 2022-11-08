import { LastfmRecentTracksTrack } from '@musicorum/lastfm/dist/types/packages/user'
import { RewindData, Track } from '@rewind/resolver/src/types'
import chroma from 'chroma-js'
import { Palettes, PaletteType } from '../theme/colors'
import { extractImageColor, loadImage, preloadImage } from './image'
import { getLargeLastfmImage } from './lastfm'

export interface Image {
  color: string | null
  palette: PaletteType | null
  url: string | null
}

export interface RewindTrack extends Omit<Track, 'image'> {
  image: Image
}

export interface RewindData2022 {
  firstScrobbles: RewindTrack[]
}

async function convertTrack(
  old: Track,
  preLoadImage = false,
  getPalette = false
): Promise<RewindTrack> {
  const url = old.image
  let color = null

  if (preLoadImage && url) {
    await preloadImage(url)
  }

  if (getPalette && url) {
    color = await extractImageColor(url)
  }

  return {
    ...old,
    image: {
      url,
      color,
      palette: color ? getClosestPalette(color) : null
    }
  }
}

export async function sanitizeRewindData(
  rewindData: RewindData
): Promise<RewindData2022> {
  const firstScrobbles = await Promise.all(
    rewindData.firstScrobbles.map((track, i) =>
      convertTrack(track, true, i === 0)
    )
  )

  return {
    firstScrobbles
  }
}

export function getClosestPalette(color: string, ignoreMain = true) {
  let availablePalettes = Object.values(PaletteType) as PaletteType[]
  if (ignoreMain) {
    availablePalettes = availablePalettes.filter(
      (p) =>
        ![
          PaletteType.Burn,
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
