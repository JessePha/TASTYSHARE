import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserCustomBar = ({ image, text, textColor, bgColor }) => {
  return (
    <View style={styles.userCustomBarContainer}>
      <View style={styles.userCustomBarInnerContainer}>
        <View
          style={{ ...styles.userImageContainer, backgroundColor: bgColor }}
        >
          {image}
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={{ color: textColor }}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCustomBarContainer: {
    flex: 1,
  },
  userCustomBarInnerContainer: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  userImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 150 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 2,
    alignItems: "center",
  },
});

export default UserCustomBar;
