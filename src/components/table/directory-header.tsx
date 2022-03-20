import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../../store/features/config";
import { addRow, getDictionaryName, saveDictionary, serializeDictionary } from "../../store/features/dictionary";

const DirectoryHeader = () => {
  const dispatch = useDispatch();
  const dictionaryName = useSelector(getDictionaryName);
  const serializedDictionary = useSelector(serializeDictionary);

  const showModalHandler = () => {
    dispatch(setShowModal({val: true}))
  };
  const saveChanges = () => {
    dispatch(saveDictionary(serializedDictionary));
  };
  const addNewRow = () => {
    dispatch(addRow());
  }

  return (
    <div className="w-full flex justify-between items-center mb-4">
      <h2 className="font-bold text-slate-800 text-2xl">
        {dictionaryName}
      </h2>
      <div>
        <button
          type="button"
          className="my-3 m-2 active:bg-green-50 hover:bg-green-100 bg-green-200 border-2 border-green-300 rounded px-6 py-1 text-black"
          onClick={addNewRow}
        >
          ➕ row
        </button>
        <button
          type="button"
          className="my-3 m-2 active:bg-orange-50 hover:bg-orange-100 bg-orange-200 border-2 border-orange-300 rounded px-6 py-1 text-black"
          onClick={showModalHandler}
        >
          ➕ col
        </button>
        <button
          type="button"
          className="my-3 m-2 active:bg-orange-50 hover:bg-orange-100 bg-orange-200 border-2 border-orange-300 rounded px-6 py-1 text-white"
          onClick={saveChanges}
        >
          💾
        </button>
      </div>
    </div>
  )
};

export default DirectoryHeader;
