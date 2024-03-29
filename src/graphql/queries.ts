import gql from "graphql-tag";

export const QUERY_TOKENS = gql`
  query Tokens($first: Int, $skip: Int) {
    tokens(first: $first, skip: $skip) {
      id
      tokenId
      owner
      _tokenName
      _price
      _tokenURI
    }
  }
`;

export const QUERY_TOKEN = gql`
  query Token($id: Int) {
    token(id: $id, subgraphError: allow) {
      _price
      _tokenName
      _tokenURI
      id
      owner
      tokenId
    }
  }
`;

export const QUERY_ACCOUNT_TOKENS = gql`
  query Tokens($skip: Int, $first: Int, $where: Token_filter) {
    tokens(skip: $skip, first: $first, where: $where) {
      id
      tokenId
      owner
      _tokenName
      _price
      _tokenURI
    }
  }
`;
