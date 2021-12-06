import { QueryResult, useQuery } from "@apollo/client";

import { QUERY_TOKENS } from "./queries";

export const useQueryTokens = (
  first: number = 100,
  skip: number = 0
): QueryResult => {
  return useQuery(QUERY_TOKENS, {
    variables: {
      first,
      skip,
    },
  });
};
