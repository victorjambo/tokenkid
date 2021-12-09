import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";

import modal from "./modal/slice";
import wallet from "./wallet/slice";
import tokens from "./tokens/slice";

export const store = configureStore({
  reducer: {
    modal,
    wallet,
    tokens,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false }),
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, null, Action<string>>;
