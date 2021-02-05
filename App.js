import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import TastyShare from "./src/TastyShare";
import store from "./src/shared/global/globalstates/store";
import SplashScreen from "./src/view/SplashView";
import * as Location from "expo-location";

function App() {
  const [content, setContent] = useState(<SplashScreen />);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  if (errorMsg) {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    wait(3000).then(() => setContent(<TastyShare />));
  } else if (location) {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    wait(3000).then(() => setContent(<TastyShare />));
  }

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <ActionSheetProvider>
        <Provider store={store}>{content}</Provider>
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

export default App;
