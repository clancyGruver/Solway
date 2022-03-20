export type Lang = 'RU' | 'ES' | 'EN';

export type ColumnItem = Record<Lang, string>;
export type DictionaryName = Record<Lang, string>;

export type CatalogItemRequest = {
  id: number,
  content: record<ColumnItem['EN'], ColumnItem>,
  isActive: boolean,
};
export type DictionaryName = Record<Lang, string>;

export type CatalogItemRequestLanguaged = {
  id: number,
  content: record<ColumnItem['EN'], string>,
  isActive: boolean,
};

export interface CatalogRequest {
  id: number,
  name: DictionaryName,
  columns: ColumnItem[],
  items: CatalogItemRequest[],
  isActive: boolean,
};

export interface CatalogRequestStore extends CatalogRequest {
  loading: boolean,
  error: string | null,
}