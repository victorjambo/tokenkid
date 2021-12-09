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
}

const initialState: IState = {
  tokens: [],
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
  },
});

export const { setHeroTokens } = tokensSlice.actions;
export default tokensSlice.reducer;
