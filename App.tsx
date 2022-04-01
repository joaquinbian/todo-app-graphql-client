import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ApolloProvider } from "@apollo/client";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { client } from "./apollo";
import { UserProvider } from "./context/UserContext";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserProvider>
          <ApolloProvider client={client}>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ApolloProvider>
        </UserProvider>
      </SafeAreaProvider>
    );
  }
}
