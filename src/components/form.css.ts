import { globalStyle, style } from '@vanilla-extract/css'
import { rgba } from 'polished'
import * as tokens from '@/styles/tokens.css'
import { getFontSize } from '@/styles/typography.css'
import { icon } from './icon.css'

const controlRadius = tokens.radius
const controlBorderWidth = '1px'
const controlPaddingVertical = `calc(0.375em - ${controlBorderWidth})`
const controlPaddingHorizontal = `calc(0.625em - ${controlBorderWidth})`

const inputColor = tokens.greyDarker
const inputBackgroundColor = tokens.white
const inputBorderColor = tokens.greyLighter
const inputShadow = `inset 0 1px 2px ${rgba(tokens.black, 0.1)}`
const inputHoverBorderColor = tokens.greyLight
const inputFocusBorderColor = tokens.purple
const inputFocusBoxShadowSize = '0 0 0 0.125em'
const inputFocusBoxShadowColor = rgba(tokens.purple, 0.25)
const inputDisabledColor = tokens.textLight
const inputDisabledBackgroundColor = tokens.background
const inputDisabledBorderColor = tokens.background
const inputIconColor = tokens.greyLighter
const inputIconActiveColor = tokens.grey

const labelColor = tokens.greyDarker
const labelWeight = tokens.weightBold

export const input = style({
  appearance: 'none',
  alignItems: 'center',
  border: `${controlBorderWidth} solid transparent`,
  borderRadius: controlRadius,
  boxShadow: inputShadow,
  display: 'inline-flex',
  height: '2.25em',
  justifyContent: 'flex-start',
  ...getFontSize('normal'),
  paddingBottom: controlPaddingVertical,
  paddingTop: controlPaddingVertical,
  paddingLeft: controlPaddingHorizontal,
  paddingRight: controlPaddingHorizontal,
  position: 'relative',
  verticalAlign: 'top',
  backgroundColor: inputBackgroundColor,
  borderColor: inputBorderColor,
  color: inputColor,
  maxWidth: '100%',
  width: '100%',
  selectors: {
    '&:focus, &:active': {
      outline: 'none',
      borderColor: inputFocusBorderColor,
      boxShadow: `${inputFocusBoxShadowSize} ${inputFocusBoxShadowColor}`,
    },
    '&[disabled]': {
      cursor: 'not-allowed',
      backgroundColor: inputDisabledBackgroundColor,
      borderColor: inputDisabledBorderColor,
      boxShadow: 'none',
      color: inputDisabledColor,
    },
    '&:hover': {
      borderColor: inputHoverBorderColor,
    },
    '&[readonly]': {
      boxShadow: 'none',
    },
  },
  '::placeholder': {
    color: rgba(inputColor, 0.3),
  },
})

export const label = style({
  color: labelColor,
  display: 'block',
  ...getFontSize('normal'),
  fontWeight: labelWeight,
  selectors: {
    '&:not(:last-child)': {
      marginBottom: '0.5em',
    },
  },
})

export const help = style({
  display: 'block',
  ...getFontSize('small'),
  marginTop: '0.25rem',
})

export const field = style({
  selectors: {
    '&:not(:last-child)': {
      marginBottom: '0.75rem',
    },
  },
})

export const control = style({
  clear: 'both',
  ...getFontSize('normal'),
  position: 'relative',
  textAlign: 'left',
})

export const controlWithIcon = style({
  clear: 'both',
  ...getFontSize('normal'),
  position: 'relative',
  textAlign: 'left',
})

globalStyle(`${controlWithIcon} > input`, {
  paddingLeft: '2.25em',
})

globalStyle(`${controlWithIcon} > .${icon.classNames.base}`, {
  color: inputIconColor,
  height: '2.25em',
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: '2.25em',
  zIndex: 4,
  left: 0,
})

globalStyle(`${controlWithIcon} > input:focus ~ .${icon.classNames.base}`, {
  color: inputIconActiveColor,
})
