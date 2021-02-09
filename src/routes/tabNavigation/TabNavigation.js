import React from "react";
import { useTheme } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AddPostView from "../../view/AddPostView";
import HomeStack from "../homeStack/HomeStack";
import { SettingStack } from "../homeStack/SettingStack";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

const tabsNavigation = createMaterialBottomTabNavigator();
const TabNavigation = () => {
  const { colors } = useTheme();
  return (
    <tabsNavigation.Navigator
      initialRouteName="Home"
      labeled={false}
      activeColor={colors.text}
      inactiveColor="darkgray"
      barStyle={{ backgroundColor: colors.background }}
    >
      <tabsNavigation.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={20} color={color} />
          ),
        }}
      />
      <tabsNavigation.Screen
        name="addpost"
        component={AddPostView}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-circle" size={25} color={color} />
          ),
        }}
      />

      <tabsNavigation.Screen
        name="Profile"
        component={SettingStack}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={20} color={color} />
          ),
        }}
      />
    </tabsNavigation.Navigator>
  );
};

export default TabNavigation;
