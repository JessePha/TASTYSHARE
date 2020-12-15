import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddPostView from "../../view/AddPostView";
import { HomeStack } from "../homeStack/HomeStack";
import { SettingStack } from "../homeStack/SettingStack";

const tabsNavigation = createBottomTabNavigator();
const TabNavigation = ({ auth }) => {
  return (
    <>
      {auth ? (
        <>
          <tabsNavigation.Navigator
            tabBarOptions={{
              activeTintColor: "#fff",
              inactiveTintColor: "#C4C4C4",
              style: {
                backgroundColor: "#5A595B",
              },
            }}
          >
            <tabsNavigation.Screen
              name="Home"
              component={() => <HomeStack auth={auth} />}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: () => (
                  <Entypo
                    name="home"
                    size={25}
                    color="white"
                    inactiveTintColor="#C4C4C4"
                  />
                ),
              }}
            />
            <tabsNavigation.Screen name="addpost" component={AddPostView} />
            <tabsNavigation.Screen
              name="Profile"
              component={SettingStack}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: () => (
                  <AntDesign name="setting" size={25} color="white" />
                ),
              }}
            />
          </tabsNavigation.Navigator>
        </>
      ) : (
        <HomeStack />
      )}
    </>
  );
};

export default TabNavigation;
