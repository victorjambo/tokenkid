export interface IAccountBalances {
  celo: string;
  cUSD: string;
  cEUR: string;
}

export interface IWalletState {
  accountBalances: IAccountBalances;
  walletError: string;
  txHash: string;
}

export const initialState: IWalletState = {
  accountBalances: {
    celo: "0",
    cUSD: "0",
    cEUR: "0",
  },
  walletError: "",
  txHash: "",
};
