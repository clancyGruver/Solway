import { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEditColumnIdx, setShowModal } from "../../store/features/config";
import { getColumns } from "../../store/features/dictionary";

interface Props {
  idx: number,
  style: CSSProperties,
}

const TableHeader = ({ idx, style }: Props) => {
  const columnName = useSelector(getColumns)[idx];

  const dispatch = useDispatch();

  const showModalHandler = () => {
    dispatch(setEditColumnIdx({ idx }));
    dispatch(setShowModal({val: true}))
  };

  return (
    <div className="bg-purple-200 border-b border-purple-300" style={style}>
      <span
        className="cursor-pointer select-none mr-2"
        onClick={() => showModalHandler()}
      >
        ✏️
      </span>
      {columnName}
    </div>
  );
};

export default TableHeader;