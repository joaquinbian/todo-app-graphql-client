import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

//luego pasarlo a un .env
const URI = new HttpLink({
  uri: "http://localhost:4000/",
});

export const client = new ApolloClient({
  uri: "http://192.168.0.76:4000",
  cache: new InMemoryCache(),
});
