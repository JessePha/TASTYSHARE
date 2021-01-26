import React from "react";
import { useTheme } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AddPostView from "../../view/AddPostView";
import HomeStack from "../homeStack/HomeStack";
import { SettingStack } from "../homeStack/SettingStack";
import { connect } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import MatericalIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
const tabsNavigation = createMaterialBottomTabNavigator();
const TabNavigation = ({ authenticated }) => {
  const { colors } = useTheme();
  return (
    <>
      {authenticated ? (
        <>
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
                  <MatericalIcons name="add-circle" size={25} color={color} />
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
