import TokenKidFactoryContract from "@/contractClient/TokenKidFactory";

export interface IAccountBalances {
  celo: string;
  cUSD: string;
  cEUR: string;
}

export interface IWalletState {
  accountBalances: IAccountBalances;
  contracts: TokenKidFactoryContract;
  walletError: string;
  txHash: string;
}

export const initialState: IWalletState = {
  accountBalances: {
    celo: "0",
    cUSD: "0",
    cEUR: "0",
  },
  contracts: null,
  walletError: "",
  txHash: "",
};
