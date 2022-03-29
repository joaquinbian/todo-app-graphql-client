import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";
//luego pasarlo a un .env

const link = createHttpLink({
  uri: "http://192.168.0.76:4000",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync("token");
  return {
    headers: {
      ...headers,
      authorization: token || "",
      // authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  // uri: "http://192.168.0.76:4000",
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
