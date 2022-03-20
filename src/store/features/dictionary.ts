import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';
import { CatalogRequest, CatalogRequestStore, ColumnItem, Lang } from '../../@types';

const timeOut = () => new Promise(resolve => setTimeout(resolve, 100));

export const loadDictionary = createAsyncThunk(
  'dictionary/load',
  async () => {
    const dictionary = await import('../../assets/dictionary.json');
    return dictionary;
  }
);

export const saveDictionary = createAsyncThunk(
  'dictionary/save',
  async (serializeDictionary: CatalogRequest) => {
    await timeOut();
    return JSON.stringify(serializeDictionary);
  });

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
    addRow: (state) => {
      const itemData: ColumnItem = {
        EN: '',
        ES: '',
        RU: '',
      };

      state.items.push({
        id: -1,
        isActive: true,
        content: {
          ...state.columns.reduce((acc, { EN }) => ({
            ...acc,
            [EN]: {...itemData},
          }), {}),
        },
      });
    },
    updateItem: (state, { payload }) => {
      const item = state.items.find(item => item.id === payload.itemIdx);
      if (item) {
        item.content = {
          ...item.content,
          [payload.columnName]: {
            ...item.content[payload.columnName],
            [payload.lang]: payload.newContent
          },
        }
      }
    },
    updateColumn: (state, { payload: { columnIdx, data } }) => {
      const newName = data.EN;
      const oldName = state.columns[columnIdx].EN;
      Object.entries(data).forEach(([key, value]) => {
        //@ts-ignore
        state.columns[columnIdx][key] = value;
      });
      state.items.forEach((item) => {
        const val = {...item.content[oldName]};
        delete item.content[oldName];
        item.content[newName] = val;
      })
    },
    addColumn: (state, { payload: { data } }) => {
      state.columns.push(data);

      const itemData: ColumnItem = {
        EN: '',
        ES: '',
        RU: '',
      };

      state.items.forEach((item) => {
        item.content[data.EN] = itemData;
      })
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
      })
      .addCase(saveDictionary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDictionary.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
      })
      .addCase(saveDictionary.rejected, (state) => {
        state.loading = false;
        state.error = 'Unknown Error';
      });
  }
});

// Action creators are generated for each case reducer function
export const { updateColumn, addColumn, updateItem, addRow } = dictionarySlice.actions;

export default dictionarySlice.reducer;

const getDictionary = (state: RootState) => state.dictionary;
export const getLang = (state: RootState) => state.config.lang;

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
    content: Object.keys(item.content).reduce((acc, columnName) => ({
      ...acc,
      [columnName]: item.content[columnName][lang],
    }), {})
  }))
);
export const serializeDictionary = createSelector(
  getDictionary,
  (dict) => ({
    id: dict.id,
    name: dict.name,
    columns: dict.columns,
    isActive: dict.isActive,
    items: dict.items,
  })
);