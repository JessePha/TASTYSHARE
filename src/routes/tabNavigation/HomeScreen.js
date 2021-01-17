import React from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AddPostView from "../../view/AddPostView";
import HomeStack from "../homeStack/HomeStack";
import { SettingStack } from "../homeStack/SettingStack";
import { connect } from "react-redux";
const tabsNavigation = createMaterialBottomTabNavigator();
const TabNavigation = ({ authenticated }) => {
  return (
    <>
      {authenticated ? (
        <>
          <tabsNavigation.Navigator
            initialRouteName="Home"
            labeled={false}
            barStyle={{ backgroundColor: "#5A595B" }}
          >
            <tabsNavigation.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarIcon: () => (
                  <Entypo name="home" size={25} color="white" />
                ),
              }}
            />
            <tabsNavigation.Screen
              name="addpost"
              component={AddPostView}
              options={{
                tabBarIcon: () => (
                  <MaterialIcons name="add-circle" size={25} color="white" />
                ),
              }}
            />
            <tabsNavigation.Screen
              name="Profile"
              component={SettingStack}
              options={{
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

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, null)(TabNavigation);
