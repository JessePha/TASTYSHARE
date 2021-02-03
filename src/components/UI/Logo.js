import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { appColors } from "../../shared/global/colors/colors";

const Logo = ({ size }) => {
  return (
    <View>
      <Text style={{ ...style.Logo, fontSize: size }}>TastyShare</Text>
    </View>
  );
};

const style = StyleSheet.create({
  Logo: {
    fontSize: 30,
    color: appColors.logo,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});

export default Logo;
