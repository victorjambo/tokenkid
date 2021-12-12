import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITokenKid } from "../wallet/types";

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
  currentToken: ITokenKid,
}

export const defaultTokenInfo: ITokenKid = {
  tokenId: null,
  tokenName: "",
  owner: "",
  previousOwner: "",
  price: 0,
  tokenURI: "",
  isOnSale: false,
  tokenDesc: "",
};

const initialState: IState = {
  tokens: [],
  tokenNotFound: false,
  currentToken: defaultTokenInfo,
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
    setCurrentToken(state, action: PayloadAction<ITokenKid>) {
      state.currentToken = action.payload;
    },
  },
});

export const { setHeroTokens, setTokenNotFound, setCurrentToken } = tokensSlice.actions;
export default tokensSlice.reducer;
