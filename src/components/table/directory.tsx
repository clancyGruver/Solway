import { useDispatch, useSelector } from 'react-redux';
import { getColumns, getItems, getRawColumns, updateItem, getLang } from '../../store/features/dictionary';
import ColumnEdit from '../forms/column-edit';
import Modal from '../modal';
import DirectoryHeader from './directory-header';
import TableHeaderCell from './table-header-cell';
import { FixedSizeGrid  as Grid, GridChildComponentProps } from 'react-window';
import useWindowSize, { Size } from '../../hooks/useWindowSize';
import EditableCell from './editable-cell';
import CellEdit from '../forms/cell-edit';
import { getModalType, setEditCell, setShowModal } from '../../store/features/config';

const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
  const allContent = useSelector(getItems);
  const columnName = useSelector(getRawColumns)[columnIndex].EN;
  const dispatch = useDispatch();

  const editHandler = (rowId: number, columnName: string) => {
    dispatch(setEditCell({ rowId, columnName }));
    dispatch(setShowModal({val: true}))
  };

  if (rowIndex === 0) {
    return (<TableHeaderCell idx={columnIndex} style={style} />)
  } else {
    const row = allContent[rowIndex - 1];
    const rowContent = row?.content;

    if (rowContent) {
      //@ts-ignore
      const cellContent = rowContent[columnName];
      return (
        <EditableCell
          style={style}
          text={cellContent}
          editHandler={() => editHandler(row.id, columnName)}
        />);
    }
  }

  return (<div style={style}>
    Item {rowIndex},{columnIndex}
  </div>);
};

const Directory = () => {
  const windowSize: Size = useWindowSize();
  const items = useSelector(getColumns);
  const allContent = useSelector(getItems);
  const modalType = useSelector(getModalType);

  const columnsCount = items?.length;
  return (
    <>
      <DirectoryHeader />
      {
      columnsCount
        ? (<Grid
              columnCount={columnsCount}
              columnWidth={200}
              height={windowSize.height - 208}
              rowCount={allContent.length + 1}
              rowHeight={35}
              width={windowSize.width - 48}
            >
              {Cell}
            </Grid>)
        : (<div>No elements</div>)
      }
      <Modal>
        {
          modalType === 'cell'
            ? <CellEdit />
            : <ColumnEdit />
        }
      </Modal>
    </>
)};

export default Directory;