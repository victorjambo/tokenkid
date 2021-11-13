import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, IAccountBalances } from "./types";

const walletSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAccountBalances(state, action: PayloadAction<IAccountBalances>) {
      state.accountBalances = action.payload;
    },
  },
});

export const { setAccountBalances } = walletSlice.actions;
export default walletSlice.reducer;
