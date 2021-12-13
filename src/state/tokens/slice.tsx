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
        (_tokens) => _tokens.tokenId === "4" || _tokens.tokenId === "7"
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
      const _priceHistory = [...action.payload];

      if (action.payload.length) {
        _priceHistory.sort((a, b) =>
          a.transferTime < b.transferTime ? 1 : -1
        );
      }

      state.priceHistory = _priceHistory;
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
