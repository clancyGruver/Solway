interface Props {
  value: string,
  onChange: (s: string) => void,
  editHandler: (s: string) => void,
  focus?: boolean,
}

const InlineEdit = ({
  value,
  onChange,
  editHandler,
  focus = false,
}: Props) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onBlur={(e) => editHandler(e.target.value)}
    autoFocus={focus}
  />
)

export default InlineEdit;