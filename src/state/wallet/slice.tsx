import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, IAccountBalances } from "./types";

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAccountBalances(state, action: PayloadAction<IAccountBalances>) {
      state.accountBalances = action.payload;
    },
    setWalletError(state, action: PayloadAction<string>) {
      state.walletError = action.payload;
    },
    setTxHash(state, action: PayloadAction<string>) {
      state.txHash = action.payload;
    },
  },
});

export const { setAccountBalances, setWalletError, setTxHash } =
  walletSlice.actions;
export default walletSlice.reducer;
