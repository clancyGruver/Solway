import { Lang } from ".."

type Cell = {
  rowId: number,
  columnName: string,
}

export type ConfigState = {
  editCell: Cell | false,
  editColumnIdx: number,
  lang: Lang,
  showModal: boolean,
}