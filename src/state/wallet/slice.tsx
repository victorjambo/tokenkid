import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TokenKidFactoryContract from "@/contractClient/TokenKidFactory";
import { initialState, IAccountBalances } from "./types";

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAccountBalances(state, action: PayloadAction<IAccountBalances>) {
      state.accountBalances = action.payload;
    },
    setContracts(state, action: PayloadAction<TokenKidFactoryContract>) {
      state.contracts = action.payload;
    },
  },
});

export const { setAccountBalances, setContracts } = walletSlice.actions;
export default walletSlice.reducer;
