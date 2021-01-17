import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomBar = ({
  userIconHeight,
  userIconWidth,
  height,
  text,
  textColor,
  image,
  bgColor,
  iconBgColor,
  icon,
  iconWidth,
  iconHeight,
  generalIconBgColor,
  generalIconColor,
  onclick,
  isAuth,
}) => {
  return (
    <View
      style={{
        ...styles.profileContainer,
        flex: height,
        backgroundColor: bgColor,
      }}
    >
      <View style={styles.innerProfileContainer}>
        <View
          style={{
            ...styles.userImageContainer,
            width: userIconHeight,
            height: userIconWidth,
            backgroundColor: iconBgColor,
          }}
        >
          {image}
        </View>
        <Text style={{ paddingLeft: 10, color: textColor }}>{text}</Text>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        {isAuth ? (
          <TouchableOpacity onPress={onclick}>
            <View
              style={{
                ...styles.generalIconContainer,
                height: iconHeight,
                width: iconWidth,
                backgroundColor: generalIconBgColor,
              }}
            >
              {icon}
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  innerProfileContainer: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  userImageContainer: {
    width: 0,
    height: 0,
    backgroundColor: "darkgray",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
  },
  generalIconContainer: {
    height: 0,
    width: 0,
    backgroundColor: "#fff",
    borderRadius: 25,
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomBar;
