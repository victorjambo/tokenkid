import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/victorjambo/tokenkid",
  cache: new InMemoryCache(),
});

export default client;
