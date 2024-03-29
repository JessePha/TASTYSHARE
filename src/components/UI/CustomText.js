import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { appColors } from "../../shared/global/colors/colors";

const CustomText = ({ text }) => {
  let styleContainer = null;
  let textStyle = null;
  if (text === "Sign up to") {
    styleContainer = styles.signUp;
    textStyle = styles.signUpText;
  } else {
    styleContainer = styles.textContainer;
    textStyle = styles.text;
  }
  return (
    <View style={styleContainer}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  signUp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    color: appColors.text,
    fontSize: 30,
  },
  signUpText: {
    color: appColors.text,
    fontSize: 15,
  },
});

export default CustomText;
