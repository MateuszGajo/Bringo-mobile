import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

export const GRAPHQL_URL = "https://bringo-app.herokuapp.com/graphql";
export const SERVER_URL = "https://bringo-app.herokuapp.com";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URL
  }),
  cache: new InMemoryCache()
});
