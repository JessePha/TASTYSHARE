import React from "react";
import { StyleSheet, View, Image } from "react-native";
import Logo from "../components/UI/Logo";
import { appColors } from "../shared/global/colors/colors";
const gif2 = require("../../assets/TastyShare2.gif");

const IntroScreen = () => {
  return (
    <View style={styles.container}>
      <Logo size={35} />
      <Image
        style={{
          width: 300,
          height: 300,
          marginTop: 30,
        }}
        source={gif2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColors.appBgColor,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default IntroScreen;
