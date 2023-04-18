// Source: Mainnet => https://explorer.bitquery.io/celo_rc1/tokens
// Source: Alfajores => https://explorer.bitquery.io/celo_alfajores/tokens

export const tokenAddresses = {
  Alfajores: {
    tokenFactory: "0xd0Ad4A716108d6eF6e2D683865Fde412fAEdC26B", // https://alfajores-blockscout.celo-testnet.org/address/0xd0Ad4A716108d6eF6e2D683865Fde412fAEdC26B/contracts
    ERC20Tokens: {
      cUSD: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
      cEUR: "0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f",
      cGLD: "0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9",
      mCELO: "0x653cc2cc0be398614bad5d5328336dc79281e246",
      mCUSD: "0x3a0ea4e0806805527c750ab9b34382642448468d",
      mCEUR: "0x0d9b4311657003251d1efa085e74f761185f271c",
    },
  },
  Mainnet: {
    tokenFactory: "", // TODO: Deployed to Mainnet
    ERC20Tokens: {
      cUSD: "0x765de816845861e75a25fca122bb6898b8b1282a",
      cEUR: "0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73",
      cGLD: "0x471ece3750da237f93b8e339c536989b8978a438",
      mCELO: "0x7d00cd74ff385c955ea3d79e47bf06bd7386387d",
      mCUSD: "0x918146359264c492bd6934071c6bd31c854edbc3",
      mCEUR: "0xe273ad7ee11dcfaa87383ad5977ee1504ac07568",
    },
  },
  Goerli: {
    tokenFactory: "0x65F53408425D3A2C52ECD494fF2d4273623F53a4", // https://goerli.etherscan.io/address/0x65F53408425D3A2C52ECD494fF2d4273623F53a4
    ERC20Tokens: {
      cUSD: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
      cEUR: "0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f",
      cGLD: "0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9",
      mCELO: "0x653cc2cc0be398614bad5d5328336dc79281e246",
      mCUSD: "0x3a0ea4e0806805527c750ab9b34382642448468d",
      mCEUR: "0x0d9b4311657003251d1efa085e74f761185f271c",
    },
  },
};

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
