import { CSSProperties } from "react";

interface Props {
  text: string,
  style: CSSProperties,
  editHandler: () => void
}

const EditableCell = ({
  text,
  style,
  editHandler,
}: Props) => {
  return (
    <div
      style={style}
      className="border border-blue-900"
      onDoubleClick={() => editHandler()}
    >
      {text}
    </div>
  );
}

export default EditableCell;