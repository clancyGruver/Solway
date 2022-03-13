import { configureStore } from '@reduxjs/toolkit'
import dictionarySlice from './features/dictionary';
import configSlice from './features/config';

export const store = configureStore({
  reducer: {
    dictionary: dictionarySlice,
    config: configSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
