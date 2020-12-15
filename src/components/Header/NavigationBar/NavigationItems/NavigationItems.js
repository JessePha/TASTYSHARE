import React from "react";
import { StyleSheet, View } from "react-native";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({goTo, color}) => {
  const texts = ["Log in", "Register"];
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {texts.map((text) => (
        <NavigationItem key = {text} text={text} navigateTo = {goTo} color = {color} />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  appButtonLogin: {
    color: "#FFFFFF",
  },
  appButtonRegister: {
    color: "#C4C4C4",
  },
});

export default NavigationItems;
