import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserCustomBar = ({ image, text }) => {
  return (
    <View style={styles.userCustomBarContainer}>
      <View style={styles.userCustomBarInnerContainer}>
        <View style={styles.userImageContainer}>{image}</View>
      </View>
      <View style={styles.textContainer}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCustomBarContainer: {
    flex: 1,
  },
  userCustomBarInnerContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  userImageContainer: {
    width: 140,
    height: 140,
    backgroundColor: "darkgray",
    borderRadius: 150 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default UserCustomBar;
