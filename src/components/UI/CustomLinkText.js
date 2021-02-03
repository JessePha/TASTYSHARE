import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { appColors } from "../../shared/global/colors/colors";

const CustomLinkText = ({ text, onClick, textColor }) => {
  let style = styles.linkText;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick}>
        <Text style={{ ...style, color: textColor }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  linkText: {
    color: appColors.linkText,
    textAlign: "right",
  },
});

export default CustomLinkText;
