import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

const devToolsEnhancer = composeWithDevTools({ trace: true, traceLimit: 25 });

export const store = configureStore({
  reducer: {
    // walletReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
  devTools: true,
  enhancers: [devToolsEnhancer],
});

export const wrapper = createWrapper(() => store, { debug: true });

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, null, Action<string>>;
