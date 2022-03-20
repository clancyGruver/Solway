/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useDispatch, useSelector } from "react-redux";
import { getRawItems, setCellValue } from "../../store/features/dictionary";
//@ts-ignore
import { useForm, SubmitHandler } from "react-hook-form";
import { ColumnItem, Lang } from "../../@types";
import { getEditCell, setEditCell, setShowModal } from "../../store/features/config";

const CellEdit = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { rowId, columnName } = useSelector(getEditCell);

  const row = useSelector(getRawItems).filter(({ id }) => id === rowId).pop();

  let cell: ColumnItem;

  if(row?.content) {
    cell = row.content[columnName];
  } else {
    cell = {
      EN: '',
      ES: '',
      RU: '',
    };
  }

  const { register, handleSubmit, formState: { errors } } = useForm<ColumnItem>({
    mode: 'onBlur',
  });

  const closeHandler = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    dispatch(setShowModal({val: false}))
    dispatch(setEditCell(false));
  };

  const onSubmit: SubmitHandler<ColumnItem> = (data: any) => {
    dispatch(setCellValue({ rowId, columnName, data }));
    closeHandler();
  };

  return (
    <>
      <form>
        {
          Object.entries(cell).map(([lang, val]) => (
            <label key={lang} htmlFor="" className="block text-gray-700 text-sm font-bold mb-4">
              <span className="">{lang}: </span>
              <input
                {...register(lang as Lang, { required: true })}
                defaultValue={val as string}
                type="text"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors[lang as Lang] ? 'border-red-500' : ''}`}
              />
            </label>
          ))
        }
        <div className="flex items-center justify-evenly">
          <button
            className="disabled:bg-blue-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={closeHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  )
};

export default CellEdit;
