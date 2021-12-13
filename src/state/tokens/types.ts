export interface ITokenInfo {
  tokenId: number;
  tokenName: string;
  owner: string;
  previousOwner: string;
  price: number;
  tokenURI: string;
  isOnSale: boolean;
  tokenDesc: string;
}

export interface ITokenPriceHistory {
  tokenId: number;
  transferTime: number;
  from: number;
  to: number;
}

export interface ITokenGraph {
  id: string;
  owner: string;
  tokenId: string;
  _price: string;
  _tokenName: string;
  _tokenURI: string;
}

interface IState {
  tokens: ITokenGraph[];
  tokenNotFound: boolean;
  tokeninfo: ITokenInfo,
  currentAllowance: string | number,
  approved: string,
  priceHistory: ITokenPriceHistory[],
}

export const defaultTokenInfo: ITokenInfo = {
  tokenId: null,
  tokenName: "",
  owner: "",
  previousOwner: "",
  price: 0,
  tokenURI: "",
  isOnSale: false,
  tokenDesc: "",
};

export const initialState: IState = {
  tokens: [],
  tokenNotFound: false,
  tokeninfo: defaultTokenInfo,
  currentAllowance: null,
  approved: null,
  priceHistory: null,
};
