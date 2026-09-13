import { setLightness, setSaturation } from 'polished'
import * as tokens from '@/styles/tokens.css'

// Pull each hue down to a shade dark enough for white text to stay legible.
const deep = (color: string): string =>
  setLightness(0.3, setSaturation(0.62, color))

const tagColorMap: Record<string, string> = {
  // ENGINES
  Unity: deep(tokens.purple),
  'Unreal Engine 4': deep(tokens.green),
  // LANGUAGES
  Blueprints: deep(tokens.turquoise),
  'C++': deep(tokens.red),
  'C#': deep(tokens.orange),
  JavaScript: deep(tokens.lime),
  Ruby: deep(tokens.maroon),
  Flutter: deep(tokens.blue),
  Python: deep(tokens.yellow),
}

export const getColorForTag = (tag: string): string =>
  tagColorMap[tag] ?? tokens.greyDark
