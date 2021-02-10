import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "../../view/SettingScreen";
import UserSettingScreen from "../../view/UserSettingScreen";
import UserPosts from "../../view/UserProfileScreen";
import SavedPostScreen from "../../view/SavedPostScreen";

const settingStack = createStackNavigator();

export const SettingStack = () => {
  return (
    <settingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <settingStack.Screen name="setting" component={SettingScreen} />
      <settingStack.Screen name="savedpost" component={SavedPostScreen} />
      <settingStack.Screen name="userpost" component={UserPosts} />
      <settingStack.Screen name="usersetting" component={UserSettingScreen} />
    </settingStack.Navigator>
  );
};
