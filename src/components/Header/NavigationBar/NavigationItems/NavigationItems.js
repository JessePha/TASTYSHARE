import React from "react";
import { StyleSheet, View } from "react-native";
import NavigationItem from "./NavigationItem/NavigationItem";
import { appColors } from "../../../../shared/global/colors/colors";

const NavigationItems = ({ goTo, color }) => {
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
        <NavigationItem
          key={text}
          text={text}
          navigateTo={goTo}
          color={color}
        />
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  appButtonLogin: {
    color: appColors.appButtonLogin,
  },
  appButtonRegister: {
    color: appColors.appButtonRegister,
  },
});

export default NavigationItems;
