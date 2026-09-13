import * as tokens from '@/styles/tokens.css'

const tagColorMap: Record<string, string> = {
  // ENGINES
  Unity: tokens.purple,
  'Unreal Engine 4': tokens.green,
  // LANGUAGES
  Blueprints: tokens.turquoise,
  'C++': tokens.red,
  'C#': tokens.orange,
  JavaScript: tokens.lime,
  Ruby: tokens.maroon,
  Flutter: tokens.blue,
  Python: tokens.yellow,
}

export const getColorForTag = (tag: string): string =>
  tagColorMap[tag] ?? tokens.greyLighter
