import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ConfigState } from "../../@types/store/indx";

const initialState: ConfigState = {
  editColumnIdx: -1,
  lang: 'EN',
  showModal: false,
  editCell: false,
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setEditColumnIdx: (state, { payload }) => { state.editColumnIdx = payload.idx },
    setEditCell: (state, { payload }) => { state.editCell = payload },
    changeLang: (state, { payload }) => {
      state.lang = payload.newLang;
    },
    setShowModal: (state, { payload }) => {
      state.showModal = payload.val;
    },
  },
})

export const { changeLang, setShowModal, setEditColumnIdx, setEditCell } = configSlice.actions;

export default configSlice.reducer;

export const getConfig = (state: RootState): ConfigState => state.config;

export const isShowModal = createSelector(
  getConfig,
  (config) => config.showModal
);

export const getEditColumnIdx = createSelector(
  getConfig,
  (config) => config.editColumnIdx
);
export const getEditCell = createSelector(
  getConfig,
  (config) => config.editCell,
);

export const getModalType = createSelector(
  getConfig,
  (config) => config.editCell ? 'cell' : 'column',
);
