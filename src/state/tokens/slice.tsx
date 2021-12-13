import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ITokenInfo,
  initialState,
  ITokenGraph,
  ITokenPriceHistory,
} from "./types";

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setHeroTokens(state, action: PayloadAction<ITokenGraph[]>) {
      state.tokens = action.payload.filter(
        (_tokens) => _tokens.id === "2" || _tokens.id === "4"
      );
    },
    setTokenNotFound(state, action: PayloadAction<boolean>) {
      state.tokenNotFound = action.payload;
    },
    setTokeninfo(state, action: PayloadAction<ITokenInfo>) {
      state.tokeninfo = action.payload;
    },
    setCurrentAllowance(state, action: PayloadAction<string | number>) {
      state.currentAllowance = action.payload;
    },
    setApproved(state, action: PayloadAction<string>) {
      state.approved = action.payload;
    },
    setPriceHistory(state, action: PayloadAction<ITokenPriceHistory[]>) {
      state.priceHistory = action.payload;
    },
  },
});

export const {
  setHeroTokens,
  setTokenNotFound,
  setTokeninfo,
  setCurrentAllowance,
  setApproved,
  setPriceHistory,
} = tokensSlice.actions;
export default tokensSlice.reducer;
