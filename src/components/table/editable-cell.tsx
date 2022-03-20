import { CSSProperties, useState } from "react";
import InlineEdit from "../forms/inlie";

interface Props {
  text: string,
  style: CSSProperties,
  editHandler: (s: string) => void
}

const EditableCell = ({
  text: cellContent,
  style,
  editHandler,
}: Props) => {
  const [content, setContent] = useState(cellContent)
  const [isEdit, setIsEdit] = useState(false)

  const onChange = (newContent: string) => {
    setContent(newContent);
  };

  const editHandlerEnhanced = (s: string) => {
    setIsEdit(false);
    editHandler(s);
  };
  
  return (
    <div
      style={style}
      className="border border-blue-900"
      onDoubleClick={() => setIsEdit(true)}
    >
      {
        isEdit
          ? <InlineEdit
              value={content}
              onChange={onChange}
              editHandler={editHandlerEnhanced}
              focus
            />
          : content
      }
    </div>
  );
}

export default EditableCell;