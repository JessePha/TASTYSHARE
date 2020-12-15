import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NavigationItems from "./NavigationBar/NavigationItems/NavigationItems";
import Logo from "../UI/Logo";

const Header = ({ navigation, logoSize, color }) => {
  return (
    <View style={style.Header}>
      <Logo size={logoSize} />
      <NavigationItems goTo = {navigation} color = {color}/>
    </View>
  );
};

const style = StyleSheet.create({
  Header: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
  },
});

export default Header;
