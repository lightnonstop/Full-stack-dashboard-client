import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import globalReducer from '../state/state'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from '../state/api';
export const store = configureStore({
    reducer: {
      global: globalReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>>