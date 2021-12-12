import TokenKidFactoryContract from "@/contractClient/TokenKidFactory";

export interface IAccountBalances {
  celo: string;
  cUSD: string;
  cEUR: string;
}

export interface IWalletState {
  accountBalances: IAccountBalances;
  contracts: TokenKidFactoryContract;
}

export const initialState: IWalletState = {
  accountBalances: {
    celo: "0",
    cUSD: "0",
    cEUR: "0",
  },
  contracts: null,
};

export interface ITokenKid {
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
