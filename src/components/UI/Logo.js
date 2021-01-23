import React from "react";
import { Text, StyleSheet, View } from "react-native";

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
    color: "#00C2FF",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});

export default Logo;
