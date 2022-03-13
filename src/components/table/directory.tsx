import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'rsuite-table';
import { setShowModal } from '../../store/features/config';
import { getItems } from '../../store/features/dictionary';
import ColumnEdit from '../forms/column-edit';
import Modal from '../modal';
import DictionaryBody from './body';
import DirectoryHeader from './directory-header';
import TableHeader from './table-header';

const Directory = () => {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  console.log(items);
  

  const closeModalHandler = () => {
    dispatch(setShowModal({val: false}))
  };

  return (
    <>
      <DirectoryHeader />
      <div className="rounded-xl overflow-auto">
        <div className="shadow-sm">
          <Table className="table-auto bg-purple-50 w-full" data={[]}>
            <TableHeader />
            <DictionaryBody />
          </Table>
        </div>
      </div>
      <Modal>
        <ColumnEdit
          columnIdx={null}
          closeHandler={closeModalHandler}
        />
      </Modal>
    </>
)};

export default Directory;