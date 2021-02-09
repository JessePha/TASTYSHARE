import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingView from "../../view/SettingView";
import UserSettingView from "../../view/UserSettingView";
import UserPosts from "../../view/UserProfileView";
import SavedPostScreen from "../../view/SavedPostScreen";

const settingStack = createStackNavigator();

export const SettingStack = () => {
  return (
    <settingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <settingStack.Screen name="setting" component={SettingView} />
      <settingStack.Screen name="savedpost" component={SavedPostScreen} />
      <settingStack.Screen name="userpost" component={UserPosts} />
      <settingStack.Screen name="usersetting" component={UserSettingView} />
    </settingStack.Navigator>
  );
};
