/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useDispatch, useSelector } from "react-redux";
import { addColumn, getRawColumns, updateColumn } from "../../store/features/dictionary";
//@ts-ignore
import { useForm, SubmitHandler } from "react-hook-form";
import { ColumnItem, Lang } from "../../@types";
type Inputs = ColumnItem;

type Props = {
  columnIdx: number | null,
  closeHandler: () => void,
}

const ColumnEdit = ({ columnIdx, closeHandler }: Props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ColumnItem> = (data: any) => {
    if (columnIdx !== null) {
      dispatch(updateColumn({
        columnIdx,
        data
      }));
    } else {
      dispatch(addColumn({
        data
      }));
    }
    closeHandler();
  };

  const columns = useSelector(getRawColumns);

  let column;
  if (columnIdx !== null) {
    column = columns[columnIdx];
  } else {
    column = {
      EN: '',
      ES: '',
      RU: '',
    };
  }

  return (
    <>
      {columnIdx === null && <h2 className="mb-4 border-blue-800 border-b pb-2 pl-2 font-bold text-xl">New Column</h2>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {
          Object.entries(column).map(([lang, val]) => (
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
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

export default ColumnEdit;