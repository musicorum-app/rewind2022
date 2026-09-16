export type Gradient = [string, string]

export interface Palette {
  darkerColor: string
  color: string
  targetColors?: string[]
}

export enum PaletteType {
  Candy = 'Candy',
  Gold = 'Gold',
  Sky = 'Sky',
  Black = 'Black',

  Yellow = 'Yellow',
  Red = 'Red',
  DarkBlue = 'DarkBlue',
  WeirdSky = 'WeirdSky',
  Pink = 'Pink',
  Chuu = 'Chuu',
  Wine = 'Wine',
  Orange = 'Orange',
  NatureGreen = 'NatureGreen',
  Brat = 'Brat',
  MushYellow = 'MushYellow',
  Brownie = 'Brownie'
}

export const Palettes: Record<PaletteType, Palette> = {
  Gold: {
    darkerColor: '#6C4704',
    color: '#FFAD1C'
  },
  Candy: {
    darkerColor: '#490808',
    color: '#F05555'
  },
  Sky: {
    darkerColor: '#062F47',
    color: '#2698D8'
  },

  Black: {
    darkerColor: '#2E2E2E',
    color: '#C4C4C4',
    targetColors: ['#2E2E2E', '#C4C4C4']
  },
  Yellow: {
    darkerColor: '#4D3800',
    color: '#f4ad1f',
    targetColors: ['#f4ad1f', '#E9CB20', '#ff0']
  },
  Red: {
    darkerColor: '#370000',
    color: '#D61C2E',
    targetColors: ['#dc2748', '#370000', '#D61C2E', '#f00']
  },
  DarkBlue: {
    darkerColor: '#150036',
    color: '#446DFF',
    targetColors: ['#446DFF', '#00174A']
  },
  WeirdSky: {
    darkerColor: '#002E41',
    color: '#2EB7E2',
    targetColors: ['#2EB7E2', '#00667C']
  },
  Pink: {
    darkerColor: '#4F0E2D',
    color: '#FF6B93',
    targetColors: ['#4F0E2D', '#FF6B93']
  },
  Chuu: {
    darkerColor: '#451B1B',
    color: '#F1626B',
    targetColors: ['#5C2323', '#F1626B']
  },
  Wine: {
    darkerColor: '#32000A',
    color: '#B42946',
    targetColors: ['#B42946', '#32000A']
  },
  Orange: {
    darkerColor: '#482803',
    color: '#F37724'
  },
  NatureGreen: {
    darkerColor: '#0C301F',
    color: '#26C87E'
  },
  Brat: {
    darkerColor: '#142D11',
    color: '#8ACE00',
    targetColors: ['#60F551', '#142D11', '#0f0', '#8ACE00']
  },
  MushYellow: {
    darkerColor: '#30360A',
    color: '#DDFA2E'
  },
  Brownie: {
    darkerColor: '#2C1307',
    color: '#945637'
  }
}
