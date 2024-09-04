import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import Stack from "./screens/Stack";
import { Fonts } from "./constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const queryClient = new QueryClient();

const App = () => {
  const [loaded] = useFonts(Fonts);

  if (!loaded) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <StatusBar style="auto" />
              <Stack />
            </NavigationContainer>
          </QueryClientProvider>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
