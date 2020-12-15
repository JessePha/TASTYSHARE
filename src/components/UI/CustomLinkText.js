import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomLinkText = ({ text, onClick }) => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress = {onClick}>
        <Text style={styles.LinkText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  LinkText: {
    color: "#C4C4C4",
    textAlign: "right",
  },
});

export default CustomLinkText;
