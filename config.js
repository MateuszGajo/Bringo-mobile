import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://bringo-app.herokuapp.com/graphql`
  }),
  cache: new InMemoryCache()
});
