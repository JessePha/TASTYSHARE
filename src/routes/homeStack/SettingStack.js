import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingView from "../../view/SettingView";
import AddPostView from "../../view/AddPostView";

const settingStack = createStackNavigator();

export const SettingStack = () => {
  return (
    <settingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <settingStack.Screen name="setting" component={SettingView} />
    </settingStack.Navigator>
  );
};
