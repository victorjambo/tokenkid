export const NETWORKS = {
  5: {
    name: "Ethereum Goerli",
    contractAddress: "0x65F53408425D3A2C52ECD494fF2d4273623F53a4",
    displayName: "Goerli",
    shortName: "eth",
    network: "goerli",
    testnet: true,
    chainId: 5,
    networkId: 5,
    testNetwork: true,
    transactionBlockTimeout: 150,
    rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_GOERLI || "",
    publicRPC: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    logo: "/images/chains/goerli.svg",
    blockExplorer: {
      name: "Etherscan",
      baseUrl: "https://goerli.etherscan.io",
      api: "https://api-goerli.etherscan.io/",
      resources: {
        transaction: "tx",
        address: "address",
      },
    },
    nativeCurrency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      exchangeRate: 10000,
      logo: "/images/chains/goerli.svg",
    },
    gnosis: {
      txServiceUrl: "https://safe-transaction.goerli.gnosis.io/api/v1",
    },
    metadata: {
      colors: {
        background: "blue-liquidity",
      },
    },
  },
};
