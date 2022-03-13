import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';
import { CatalogRequestStore, ColumnItem, Lang } from '../../@types'

export const loadDictionary = createAsyncThunk(
  'dictionary/load',
  async () => {
    const dictionary = await import('../../assets/dictionary.json');
    console.log(dictionary);
    return dictionary;
  }
);

const initialState: CatalogRequestStore = {
  id: 0,
  name: {
    RU: '',
    EN: '',
    ES: '',
  },
  columns: [],
  items: [],
  isActive: true,
  loading: false,
  error: null,
}

export const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    updateColumn: (state, { payload: { columnIdx, data } }) => {
      Object.entries(data).forEach(([key, value]) => {
        //@ts-ignore
        state.columns[columnIdx][key] = value;
      });
    },
    addColumn: (state, { payload: { data } }) => {
      state.columns.push(data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDictionary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDictionary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.id = payload.id;
        state.name = payload.Name;
        state.columns = payload.columns;
        state.items = payload.items;
        state.isActive = payload.isActive;
      })
      .addCase(loadDictionary.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = 'Unknown Error';
      });
  }
})

// Action creators are generated for each case reducer function
export const { updateColumn, addColumn } = dictionarySlice.actions

export default dictionarySlice.reducer

const getDictionary = (state: RootState) => state.dictionary;
const getLang = (state: RootState) => state.config.lang;

export const getColumnsCount = createSelector(getDictionary, (dict) => dict.columns.length);
export const getLoading = createSelector(getDictionary, (dict) => dict.loading);
export const getRawColumns = createSelector(
  getDictionary,
  (dict) => dict.columns
)
export const getColumns = createSelector(
  [getDictionary, getLang],
  (dict, lang: Lang) => dict
    .columns
    .reduce((acc: string[], item: ColumnItem) => [...acc, item[lang]] , [])
);
export const getDictionaryName = createSelector(
  [getDictionary, getLang],
  (dict, lang: Lang) => dict.name[lang]
);
export const getItems = createSelector(
  [getDictionary, getLang],
  (dict, lang: Lang) => dict.items.map((item) => ({
    ...item,
    content: Object.keys(item.content).map((columnName) => ({[columnName]: item.content[columnName][lang]}))
  }))
);