export const RPC_URL =
  "https://celo-mainnet.infura.io/v3/472f14ceadff4381b88efde2365064b0";

export interface IToken {
  name: string;
  shortName: string;
  contractAddress: `0x${string}`;
  chainId: number;
  ERC20Tokens: {
    address: `0x${string}`;
    name: string;
    decimals: number;
  };
  blockExplorer: {
    name: string;
    baseUrl: string;
    api: string;
    resources: {
      transaction: string;
      address: string;
    };
  };
  graphUrl?: string;
}

export const TOKENS: Record<number, IToken> = {
  5: {
    name: "Ethereum Goerli",
    shortName: "goerli",
    contractAddress: "0x65F53408425D3A2C52ECD494fF2d4273623F53a4",
    chainId: 5,
    ERC20Tokens: {
      address: "0x07865c6e87b9f70255377e024ace6630c1eaa37f",
      name: "usdc",
      decimals: 6,
    },
    blockExplorer: {
      name: "Etherscan",
      baseUrl: "https://goerli.etherscan.io",
      api: "https://api-goerli.etherscan.io/",
      resources: {
        transaction: "tx",
        address: "address",
      },
    },
    graphUrl:
      "https://api.thegraph.com/subgraphs/name/victorjambo/tokenkid-goerli",
  },
  44787: {
    name: "Celo Alfajores",
    shortName: "alfajores",
    contractAddress: "0xd0Ad4A716108d6eF6e2D683865Fde412fAEdC26B",
    chainId: 5,
    ERC20Tokens: {
      address: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
      name: "cUSD",
      decimals: 6,
    },
    blockExplorer: {
      name: "alfajores",
      baseUrl: "https://alfajores-blockscout.celo-testnet.org",
      api: "https://explorer.celo.org/alfajores/api",
      resources: {
        transaction: "tx",
        address: "address",
      },
    },
    graphUrl: "https://api.thegraph.com/subgraphs/name/victorjambo/tokenkid",
  },
  137: {
    name: "Polygon",
    shortName: "polygon",
    contractAddress: "0x100", // TODO
    chainId: 137,
    ERC20Tokens: {
      address: "0x100", // TODO
      name: "usdc",
      decimals: 6,
    },
    blockExplorer: {
      name: "Polygonscan",
      baseUrl: "https://polygonscan.com",
      api: "https://api.polygonscan.com",
      resources: {
        transaction: "tx",
        address: "address",
      },
    },
  },
  1: {
    name: "Ethereum",
    shortName: "mainnet",
    contractAddress: "0x100", // TODO
    chainId: 1,
    ERC20Tokens: {
      address: "0x100",
      name: "usdc",
      decimals: 6,
    },
    blockExplorer: {
      name: "Etherscan",
      baseUrl: "https://etherscan.io",
      api: "https://api.etherscan.io",
      resources: {
        transaction: "tx",
        address: "address",
      },
    },
  },
};
