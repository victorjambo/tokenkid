import { QueryResult, useQuery } from "@apollo/client";

import { QUERY_TOKENS } from "./queries";

export const useQueryTokens = (
  owner?: string,
  first: number = 100,
  skip: number = 0
): QueryResult => {
  let variables = {
    first,
    skip,
  };
  if (owner) {
    variables["where"] = {
      owner,
    };
  }
  return useQuery(QUERY_TOKENS, {
    variables,
  });
};
