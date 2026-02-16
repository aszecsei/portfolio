import { globalStyle, style } from '@vanilla-extract/css'

export const githubBox = style({
  fontFamily: 'helvetica, arial, sans-serif',
  fontSize: '13px',
  lineHeight: '18px',
  background: '#fafafa',
  border: '1px solid #ddd',
  color: '#666',
  borderRadius: '3px',
})

export const githubTitle = style({
  position: 'relative',
  borderBottom: '1px solid #ddd',
  borderRadius: '3px 3px 0 0',
  background: 'linear-gradient(#fcfcfc, #ebebeb)',
  '@media': {
    'screen and (max-width: 767px)': {
      height: 'auto',
      minHeight: '60px',
    },
  },
})

globalStyle(`${githubTitle} h3`, {
  wordWrap: 'break-word',
  fontFamily: 'helvetica, arial, sans-serif',
  fontWeight: 'normal',
  fontSize: '16px',
  color: 'gray',
  margin: 0,
  padding: '10px 10px 10px 30px',
  backgroundImage:
    'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAXBAMAAAD0LQLXAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURQAAAL29vc3NzcLCwsjIyNbW1pvTNOEAAAABdFJOUwBA5thmAAAATElEQVQI12MIFoQAEQZFYwcGEGBkUDRUQLCcsYjRXhbqKkEGZQYGqJgSnKXCwGgsAGYpqyobG4WGhioyhBhDgClI3EQAqpaZwQBEAQARmA4G2o55nQAAAABJRU5ErkJggg==)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '7px center',
  width: 'auto',
})

export const githubStats = style({
  float: 'right',
  position: 'absolute',
  top: '8px',
  right: '10px',
  fontSize: '11px',
  fontWeight: 'bold',
  lineHeight: '21px',
  height: 'auto',
  minHeight: '21px',
})

export const externalLink = style({
  color: '#4183c4',
  border: 0,
  textDecoration: 'none',
})

export const repoLink = style({
  color: '#4183c4',
  border: 0,
  textDecoration: 'none',
  fontWeight: 'bold',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'block',
    },
  },
})

const statsLinkBase = {
  color: '#4183c4',
  border: 0,
  textDecoration: 'none',
  display: 'inline-block',
  height: '21px',
  borderRadius: '3px',
  padding: '0 5px 0 18px',
  background:
    'white url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAqBAMAAABB12bjAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURf///5mZmdbW1u/v7/r6+rGxscXFxaSkpHLccIMAAABsSURBVBjTY2CgBmBODTOAsFgSi9TFHMBMc1Fmk8BiEItJUMhQWFFQAZXJoC7q7FJYhNBmgG7YQAIWMYTvEExXIbh8oAJWQQe4IGsIlKmowAZVwaKowgxlMgkKmwtCjRAUYBSEqnVkYBAm39EALMwNXwql3eYAAAAASUVORK5CYII=) no-repeat',
} as const

export const statsLink = style({
  ...statsLinkBase,
  color: '#666',
  border: '1px solid #ddd',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'block',
      clear: 'right',
      float: 'right',
    },
  },
})

export const watchersLink = style({
  ...statsLinkBase,
  color: '#666',
  border: '1px solid #ddd',
  borderRight: '1px solid #ddd',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'block',
      clear: 'right',
      float: 'right',
    },
  },
})

export const forkersLink = style({
  ...statsLinkBase,
  color: '#666',
  border: '1px solid #ddd',
  backgroundPosition: '-4px -21px',
  paddingLeft: '15px',
  '@media': {
    'screen and (max-width: 767px)': {
      display: 'block',
      clear: 'right',
      float: 'right',
    },
  },
})

export const githubContent = style({
  padding: '10px',
  fontWeight: 300,
})

globalStyle(`${githubContent} > p`, {
  margin: 0,
})

export const githubContentLink = style({
  fontWeight: 'bold',
})

export const download = style({
  position: 'relative',
  borderTop: '1px solid #ddd',
  background: 'white',
  borderRadius: '0 0 3px 3px',
  padding: '10px',
  height: 'auto',
  minHeight: '24px',
  boxSizing: 'content-box',
  '@media': {
    'screen and (max-width: 767px)': {
      height: 'auto',
      minHeight: '46px',
    },
  },
})

export const updated = style({
  wordWrap: 'break-word',
  margin: 0,
  fontSize: '11px',
  color: '#666',
  lineHeight: '24px',
  fontWeight: 300,
  width: 'auto',
})

globalStyle(`${updated} strong`, {
  fontWeight: 'bold',
  color: '#000',
})

export const downloadButton = style({
  float: 'right',
  position: 'absolute',
  top: '10px',
  right: '10px',
  height: '24px',
  lineHeight: '24px',
  fontSize: '12px',
  color: '#666',
  fontWeight: 'bold',
  textShadow: '0 1px 0 rgba(255, 255, 255, 0.9)',
  textDecoration: 'none',
  padding: '0 10px',
  border: '1px solid #ddd',
  borderBottomColor: '#bbb',
  borderRadius: '3px',
  background: 'linear-gradient(#f5f5f5, #e5e5e5)',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      color: '#527894',
      borderColor: '#cfe3ed',
      borderBottomColor: '#9fc7db',
      background: 'linear-gradient(#f1f7fa, #dbeaf1)',
    },
  },
  '@media': {
    'screen and (max-width: 767px)': {
      top: '32px',
    },
  },
})
