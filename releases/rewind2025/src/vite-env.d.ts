/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
declare module 'colorthief' {
  export type RGBColor = [number, number, number]
  export default class ColorThief {
    getColor: (
      img: HTMLImageElement | null,
      quality: number = 10
    ) => RGBColor | null
    getPalette: (
      img: HTMLImageElement | null,
      colorCount: number = 10,
      quality: number = 10
    ) => RGBColor[] | null
  }
}

// https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
declare module 'csstype' {
  interface Properties {
    // Allow any CSS Custom Properties
    [index: `--${string}`]: any
  }
}
