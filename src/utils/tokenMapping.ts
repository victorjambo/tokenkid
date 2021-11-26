// Source: Mainnet => https://explorer.bitquery.io/celo_rc1/tokens
// Source: Alfajores => https://explorer.bitquery.io/celo_alfajores/tokens

export const tokenAddresses = {
  Alfajores: {
    tokenFactory: "0x37e9bDe5eC43e2a68a774Fbb4CCd0478bAfFf3fa", // https://alfajores-blockscout.celo-testnet.org/address/0x37e9bDe5eC43e2a68a774Fbb4CCd0478bAfFf3fa/contracts
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
};
