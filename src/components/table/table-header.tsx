import { useDispatch, useSelector } from "react-redux";
import { getColumns } from "../../store/features/dictionary";
import { useState } from "react";
import ColumnEdit from "../forms/column-edit";
import Modal from "../modal";
import { setShowModal } from "../../store/features/config";

const TableHeader = () => {
  const columns = useSelector(getColumns);
  const [columnIdx, setColumnIdx] = useState<number | null>(null);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    setColumnIdx(null);
    dispatch(setShowModal({val: false}))
  };
  const showModalHandler = (idx: number) => {
    setColumnIdx(idx);
    dispatch(setShowModal({val: true}))
  };

  return (
    <>
      <thead className="bg-purple-200 border-b border-purple-300">
        <tr>
          {
            columns
              .map((columnName: string, idx: number) => (
                <th key={idx} className="py-2">
                  <span
                    className="cursor-pointer select-none mr-2"
                    onClick={() => showModalHandler(idx)}
                  >
                    ✏️
                  </span>
                  {columnName}
                </th>
              ))
          }
        </tr>
      </thead>
      <Modal>
        <ColumnEdit
          columnIdx={columnIdx}
          closeHandler={closeModalHandler}
        />
      </Modal>
    </>
  );
};

export default TableHeader;