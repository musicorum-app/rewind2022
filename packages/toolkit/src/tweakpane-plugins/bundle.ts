import { TpPluginBundle } from 'tweakpane'
import { PaletteSelectPlugin } from './palette-plugin/plugin'

export const pluginsBundle: TpPluginBundle = {
  id: 'toolkit-tweakpane-plugins',
  plugins: [PaletteSelectPlugin]
}
