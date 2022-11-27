export type Gradient = [string, string]

export interface Palette {
  gradient: Gradient
  color: string
  targetColors?: string[]
}

export enum PaletteType {
  Burn = 'Burn',
  MidnightSky = 'MidnightSky',
  DisplacedOcean = 'DisplacedOcean',
  Black = 'Black',

  Yellow = 'Yellow',
  Red = 'Red',
  DarkBlue = 'DarkBlue',
  LightBlue = 'LightBlue',
  Chuu = 'Chuu',
  Wine = 'Wine'
}

export const Palettes: Record<PaletteType, Palette> = {
  Burn: {
    gradient: ['#F37724', '#AD0A0A'],
    color: '#F1A22B'
  },
  MidnightSky: {
    gradient: ['#8E178F', '#040B74'],
    color: '#B81BBA'
  },
  DisplacedOcean: {
    gradient: ['#16996A', '#29508B'],
    color: '#10BD89'
  },

  Black: {
    gradient: ['#2E2E2E', '#101010'],
    color: '#C4C4C4',
    targetColors: ['#C4C4C4', '#2E2E2E']
  },
  Yellow: {
    gradient: ['#E9CB20', '#A76E00'],
    color: '#EEF300'
  },
  Red: {
    gradient: ['#D61C2E', '#780016'],
    color: '#370000',
    targetColors: ['#dc2748', '#370000', '#D61C2E', '#f00']
  },
  DarkBlue: {
    gradient: ['#2723E1', '#010750'],
    color: '#4E4AFF'
  },
  LightBlue: {
    gradient: ['#2EB7E2', '#00667C'],
    color: '#002E41',
    targetColors: ['#2EB7E2', '#00667C']
  },
  Chuu: {
    gradient: ['#F1626B', '#923445'],
    color: '#451B1B',
    targetColors: ['#5C2323', '#F1626B']
  },
  Wine: {
    gradient: ['#B42946', '#54001E'],
    color: '#32000A',
    targetColors: ['#B42946', '#32000A']
  }
}
