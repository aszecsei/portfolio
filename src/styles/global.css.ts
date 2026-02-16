import { globalStyle } from '@vanilla-extract/css'

/* Document */
globalStyle('*, ::before, ::after', {
  backgroundRepeat: 'no-repeat',
  boxSizing: 'border-box',
})

globalStyle('::before, ::after', {
  textDecoration: 'inherit',
  verticalAlign: 'inherit',
})

globalStyle('html', {
  scrollBehavior: 'smooth',
  cursor: 'default',
  fontFamily:
    'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  lineHeight: 1.15,
  tabSize: 4,
  MozTabSize: 4,
  textSizeAdjust: '100%',
  WebkitTextSizeAdjust: '100%',
  wordBreak: 'break-word',
})

/* Sections */
globalStyle('body', {
  margin: 0,
})

globalStyle('html, body', {
  height: '100%',
  margin: 0,
})

globalStyle('h1', {
  fontSize: '2em',
  margin: '0.67em 0',
})

/* Grouping content */
globalStyle('hr', {
  height: 0,
  overflow: 'visible',
})

globalStyle('main', {
  display: 'block',
})

globalStyle('nav ol, nav ul', {
  listStyle: 'none',
})

globalStyle('pre', {
  fontFamily:
    'Menlo, Consolas, Roboto Mono, Ubuntu Monospace, Noto Mono, Liberation Mono, monospace',
  fontSize: '1em',
})

/* Text-level semantics */
globalStyle('a', {
  backgroundColor: 'transparent',
})

globalStyle('abbr[title]', {
  textDecoration: 'underline dotted',
})

globalStyle('b, strong', {
  fontWeight: 'bolder',
})

globalStyle('code, kbd, samp', {
  fontFamily:
    'Menlo, Consolas, Roboto Mono, Ubuntu Monospace, Oxygen Mono, Liberation Mono, monospace',
  fontSize: '1em',
})

globalStyle('small', {
  fontSize: '80%',
})

globalStyle('::selection', {
  backgroundColor: '#b3d4fc',
  color: '#000',
  textShadow: 'none',
})

/* Embedded content */
globalStyle('audio, canvas, iframe, img, svg, video', {
  verticalAlign: 'middle',
})

globalStyle('audio, video', {
  display: 'inline-block',
})

globalStyle('audio:not([controls])', {
  display: 'none',
  height: 0,
})

globalStyle('img', {
  borderStyle: 'none',
})

globalStyle('svg', {
  fill: 'currentColor',
})

globalStyle('svg:not(:root)', {
  overflow: 'hidden',
})

/* Tabular data */
globalStyle('table', {
  borderCollapse: 'collapse',
})

/* Forms */
globalStyle('button, input, select, textarea', {
  fontFamily: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
})

globalStyle('button, input, select', {
  margin: 0,
})

globalStyle('button', {
  overflow: 'visible',
  textTransform: 'none',
})

globalStyle('button, [type="button"], [type="reset"], [type="submit"]', {
  WebkitAppearance: 'button',
})

globalStyle('fieldset', {
  padding: '0.35em 0.75em 0.625em',
})

globalStyle('input', {
  overflow: 'visible',
})

globalStyle('legend', {
  color: 'inherit',
  display: 'table',
  maxWidth: '100%',
  whiteSpace: 'normal',
})

globalStyle('progress', {
  display: 'inline-block',
  verticalAlign: 'baseline',
})

globalStyle('select', {
  textTransform: 'none',
})

globalStyle('textarea', {
  margin: 0,
  overflow: 'auto',
  resize: 'vertical',
})

globalStyle('[type="checkbox"], [type="radio"]', {
  padding: 0,
})

globalStyle('[type="search"]', {
  WebkitAppearance: 'textfield',
  outlineOffset: '-2px',
})

/* Interactive */
globalStyle('details', {
  display: 'block',
})

globalStyle('dialog', {
  backgroundColor: 'white',
  border: 'solid',
  color: 'black',
  display: 'block',
  height: 'fit-content',
  left: 0,
  margin: 'auto',
  padding: '1em',
  position: 'absolute',
  right: 0,
  width: 'fit-content',
})

globalStyle('dialog:not([open])', {
  display: 'none',
})

globalStyle('summary', {
  display: 'list-item',
})

/* Scripting */
globalStyle('canvas', {
  display: 'inline-block',
})

globalStyle('template', {
  display: 'none',
})

/* User interaction */
globalStyle(
  'a, area, button, input, label, select, summary, textarea, [tabindex]',
  {
    touchAction: 'manipulation',
  },
)

globalStyle('[hidden]', {
  display: 'none',
})

/* Accessibility */
globalStyle('[aria-busy="true"]', {
  cursor: 'progress',
})

globalStyle('[aria-controls]', {
  cursor: 'pointer',
})

globalStyle('[aria-disabled], [disabled]', {
  cursor: 'not-allowed',
})

globalStyle('[aria-hidden="false"][hidden]:not(:focus)', {
  clip: 'rect(0, 0, 0, 0)',
  display: 'inherit',
  position: 'absolute',
})
