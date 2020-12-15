import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import TastyShare from "./src/TastyShare";
import store from "./src/shared/global/globalstates/store";

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ActionSheetProvider>
        <Provider store={store}>
          <TastyShare />
        </Provider>
      </ActionSheetProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5A595B",
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
