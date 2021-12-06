import gql from "graphql-tag";

export const QUERY_TOKENS = gql`
  query Tokens($first: Int, $skip: Int) {
    tokens(first: $first, skip: $skip) {
      tokenId
      owner
      _tokenName
      _price
      _tokenURI
    }
  }
`;
