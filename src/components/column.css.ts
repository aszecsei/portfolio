import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { mq } from '@/styles/media.css'

const columnGap = '0.75em'

const columnBase = style({
  display: 'block',
  flexBasis: 0,
  flexGrow: 1,
  flexShrink: 1,
  padding: columnGap,
})

const sizeValues = Object.fromEntries(
  Array.from({ length: 12 }, (_, i) => [
    i + 1,
    {
      '@media': {
        [mq.tablet]: {
          flex: 'none',
          width: `${((i + 1) / 12) * 100}%`,
        },
      },
    },
  ]),
) as Record<
  string,
  { '@media': Record<string, { flex: string; width: string }> }
>

export const columnSizes = styleVariants(sizeValues, (val) => [columnBase, val])

export const columnNarrow = style([
  columnBase,
  {
    '@media': {
      [mq.tablet]: {
        flex: 'none',
      },
    },
  },
])

export const columnFull = style([
  columnBase,
  {
    '@media': {
      [mq.tablet]: {
        flex: 'none',
        width: '100%',
      },
    },
  },
])

export const columnDefault = style([
  columnBase,
  {
    '@media': {
      [mq.tablet]: {
        flex: 'none',
      },
    },
  },
])

const offsetValues = Object.fromEntries(
  Array.from({ length: 12 }, (_, i) => [
    i + 1,
    {
      '@media': {
        [mq.tablet]: {
          marginLeft: `${((i + 1) / 12) * 100}%`,
        },
      },
    },
  ]),
) as Record<string, { '@media': Record<string, { marginLeft: string }> }>

export const columnOffsets = styleVariants(offsetValues)

export const columns = recipe({
  base: {
    marginLeft: `-${columnGap}`,
    marginRight: `-${columnGap}`,
    marginTop: `-${columnGap}`,
    selectors: {
      '&:last-child': {
        marginBottom: `-${columnGap}`,
      },
      '&:not(:last-child)': {
        marginBottom: `calc(1.5em - ${columnGap})`,
      },
    },
    '@media': {
      [mq.tablet]: {
        display: 'flex',
      },
    },
  },
  variants: {
    alignment: {
      left: {},
      center: { justifyContent: 'center' },
    },
    isGapless: {
      true: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        selectors: {
          '&:not(:last-child)': {
            marginBottom: '1.5em',
          },
          '&:last-child': {
            marginBottom: 0,
          },
        },
      },
    },
    isMultiline: {
      true: { flexWrap: 'wrap' },
    },
    isVcentered: {
      true: { alignItems: 'center' },
    },
  },
})

export const columnsGaplessClass = style({})

// When isGapless, child columns should have no margin/padding
globalStyle(`${columns.classNames.variants.isGapless.true} > ${columnBase}`, {
  margin: 0,
  padding: 0,
})
