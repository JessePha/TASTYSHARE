import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingView from "../../view/SettingView";
import UserSettingView from "../../view/UserSettingView";
import UserPosts from "../../view/UserProfileView";

const settingStack = createStackNavigator();

export const SettingStack = () => {
  return (
    <settingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <settingStack.Screen name="setting" component={SettingView} />
      <settingStack.Screen name="userpost" component={UserPosts} />
      <settingStack.Screen name="usersetting" component={UserSettingView} />
    </settingStack.Navigator>
  );
};
