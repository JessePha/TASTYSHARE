import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../../view/MainScreen";
import ProfileScreen from "../../view/ProfileScreen";
import FoodScreen from "../../view/FoodScreen";
import SearchScreen from "../../view/SearchScreen";
import LoadingScreen from "../../view/LoadingScreen";
import { connect } from "react-redux";

const AuthStack = createStackNavigator();

const HomeStack = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#5A595B",
        },
        headerTintColor: "#fff",
      }}
    >
      <AuthStack.Screen
        name="Main"
        component={MainScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="foodView"
        component={FoodScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="userProfile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="loading" component={LoadingScreen} />
    </AuthStack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, null)(HomeStack);
