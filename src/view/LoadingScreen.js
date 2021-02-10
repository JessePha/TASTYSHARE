import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { appColors } from "../shared/global/colors/colors";
const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColors.LoadingScreenBgColor,
  },
});
