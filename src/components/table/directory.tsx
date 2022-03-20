import { useSelector } from 'react-redux';
import { getItems } from '../../store/features/dictionary';
import ColumnEdit from '../forms/column-edit';
import Modal from '../modal';
// import DictionaryBody from './body';
import DirectoryHeader from './directory-header';
import TableHeaderCell from './table-header-cell';
import { VariableSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import useWindowSize, { Size } from '../../hooks/useWindowSize';

const columnWidths = new Array(1000)
  .fill(true)
  .map(() => 75 + Math.round(Math.random() * 50));
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));
 
const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
  if (rowIndex === 0) {
    return (<TableHeaderCell idx={columnIndex} />)
  }
  
  return (<div>
    Item {rowIndex},{columnIndex}
  </div>);
};

const Directory = () => {
  const windowSize: Size = useWindowSize();
  const items = useSelector(getItems);
  console.log(items);
  
  const columnsCount = items[0]?.content?.length;

  return (
    <>
      <DirectoryHeader />
      {/* <div className="rounded-xl overflow-auto">
        <div className="shadow-sm"> */}
          {/* <table className="table-auto bg-purple-50 w-full">
            <TableHeader />
            <DictionaryBody />
          </table> */}
        {/* </div>
      </div> */}
      {
      columnsCount
        ? (<Grid
          columnCount={columnsCount}
          columnWidth={index => columnWidths[index]}
          height={windowSize.height - 148}
          rowCount={1000}
          rowHeight={index => rowHeights[index]}
          width={windowSize.width - 48}
        >
          {Cell}
        </Grid>)
        : (<div>No elements</div>)
      }
      
      <Modal>
        <ColumnEdit />
      </Modal>
    </>
)};

export default Directory;