export const gap = 64

export const bp = {
  tablet: 769,
  desktop: 960 + 2 * gap,
  widescreen: 1152 + 2 * gap,
  fullhd: 1344 + 2 * gap,
}

export const mq = {
  mobile: `screen and (max-width: ${bp.tablet - 1}px)`,
  tablet: `screen and (min-width: ${bp.tablet}px), print`,
  tabletOnly: `screen and (min-width: ${bp.tablet}px) and (max-width: ${bp.desktop - 1}px)`,
  touch: `screen and (max-width: ${bp.desktop - 1}px)`,
  desktop: `screen and (min-width: ${bp.desktop}px)`,
  desktopOnly: `screen and (min-width: ${bp.desktop}px) and (max-width: ${bp.widescreen - 1}px)`,
  untilWidescreen: `screen and (max-width: ${bp.widescreen - 1}px)`,
  widescreen: `screen and (min-width: ${bp.widescreen}px)`,
  widescreenOnly: `screen and (min-width: ${bp.widescreen}px) and (max-width: ${bp.fullhd - 1}px)`,
  untilFullhd: `screen and (max-width: ${bp.fullhd - 1}px)`,
  fullhd: `screen and (min-width: ${bp.fullhd}px)`,
  from: (device: keyof typeof bp) => `screen and (min-width: ${bp[device]}px)`,
  until: (device: keyof typeof bp) =>
    `screen and (max-width: ${bp[device] - 1}px)`,
}
