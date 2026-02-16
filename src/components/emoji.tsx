interface IEmojiProps {
  symbol: string
  label?: string
}

export const Emoji = (props: IEmojiProps) => (
  <span
    role="img"
    aria-label={props.label ? props.label : ''}
    aria-hidden={props.label ? 'false' : 'true'}
  >
    {props.symbol}
  </span>
)
