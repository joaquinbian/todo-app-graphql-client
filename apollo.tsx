import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

//luego pasarlo a un .env

export const client = new ApolloClient({
  uri: "http://192.168.0.76:4000",
  cache: new InMemoryCache(),
});
