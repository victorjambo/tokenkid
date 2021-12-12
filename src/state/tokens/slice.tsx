import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IToken {
  id: string;
  owner: string;
  tokenId: string;
  _price: string;
  _tokenName: string;
  _tokenURI: string;
}

interface IState {
  tokens: IToken[];
  tokenNotFound: boolean;
}

const initialState: IState = {
  tokens: [],
  tokenNotFound: false,
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setHeroTokens(state, action: PayloadAction<IToken[]>) {
      state.tokens = action.payload.filter(
        (_tokens) => _tokens.id === "2" || _tokens.id === "4"
      );
    },
    setTokenNotFound(state, action: PayloadAction<boolean>) {
      state.tokenNotFound = action.payload;
    },
  },
});

export const { setHeroTokens, setTokenNotFound } = tokensSlice.actions;
export default tokensSlice.reducer;
