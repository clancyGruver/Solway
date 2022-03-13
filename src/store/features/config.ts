import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ConfigState } from "../../@types/store/indx";

const initialState: ConfigState = {
  lang: 'EN',
  showModal: false,
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    changeLang: (state, { payload }) => {
      state.lang = payload.newLang;
    },
    setShowModal: (state, { payload }) => {
      state.showModal = payload.val;
    },
  },
})

export const { changeLang, setShowModal } = configSlice.actions;

export default configSlice.reducer;

export const getConfig = (state: RootState): ConfigState => state.config;

export const isShowModal = createSelector(
  getConfig,
  (config) => config.showModal
);