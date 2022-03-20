import { Lang } from ".."

type Cell = {
  columnName: string,
  value: ColumnItem,
}

export type ConfigState = {
  editCell: Cell | false,
  editColumnIdx: number,
  lang: Lang,
  showModal: boolean,
}