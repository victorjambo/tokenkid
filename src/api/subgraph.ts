import { Pool } from "undici";
import { HTTPDataSource } from "memoizing-apollo-datasource-http";
import { QUERY_TOKENS, QUERY_ACCOUNT_TOKENS } from "@/graphql/queries";
import { print } from "graphql/language/printer";
import { TOKENS } from "@/utils/tokenAddresses";

const BASE_URL = "https://api.thegraph.com";
const SUPPORTED_CHAIN_IDS: CHAIN_IDS[] = [5, 44787];

const QUERY_TYPE = {
  Tokens: QUERY_TOKENS,
  AccountTokens: QUERY_ACCOUNT_TOKENS,
};

class Subgraph extends HTTPDataSource {
  constructor() {
    super(BASE_URL, {
      pool: new Pool(BASE_URL),
      clientOptions: {
        bodyTimeout: 5000,
        headersTimeout: 2000,
      },
      lru: {
        maxAge: 10000, // 10 seconds
      },
    });
  }

  protected async getTokensByChain(
    chainId: CHAIN_IDS,
    queryType = QUERY_TYPE.Tokens,
    where?: Record<string, string | number>
  ): Promise<GraphToken[]> {
    const chainURI = TOKENS[chainId].graphUrl;
    const chainName = TOKENS[chainId].shortName;

    const { body } = await this.post<GraphResponse>(chainURI, {
      body: {
        query: print(queryType),
        variables: {
          first: 100,
          skip: 0,
          ...(where && { where }),
        },
        requestCache: {
          maxTtl: 10, // cache for up to 10 seconds
          maxTtlIfError: 20, // or 20 seconds if error
        },
      },
    });

    if (!body.data || body.data.tokens == null) {
      return [];
    }

    const tokens = body.data.tokens.map((token) => {
      token.id = `${chainName}-${token.id}`;
      token.chainId = TOKENS[chainId].chainId;
      return token;
    });

    return tokens;
  }

  public async getTokens(): Promise<GraphToken[]> {
    const response = await Promise.all(
      SUPPORTED_CHAIN_IDS.map((chainId) => this.getTokensByChain(chainId))
    );

    return response.flat();
  }

  public async getAccountTokens(address: string): Promise<GraphToken[]> {
    const where = {
      owner: address,
    };

    const response = await Promise.all(
      SUPPORTED_CHAIN_IDS.map((chainId) =>
        this.getTokensByChain(chainId, QUERY_TYPE.AccountTokens, where)
      )
    );

    return response.flat();
  }
}

export default Subgraph;

export interface GraphToken {
  id: string;
  tokenId: string;
  owner: string;
  _tokenName: string;
  _price: string;
  _tokenURI: string;
  chainId: number;
}

interface GraphResponse {
  status: string;
  statusText: string;
  data: {
    tokens: GraphToken[];
  };
}

type CHAIN_IDS = 5 | 44787;
