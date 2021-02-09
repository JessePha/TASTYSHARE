import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainView from "../../view/MainView";
import ProfileView from "../../view/ProfileView";
import FoodView from "../../view/FoodView";
import SearchView from "../../view/SearchView";
import LoadingScreen from "../../view/LoadingView";
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
        component={MainView}
        options={() => ({
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="search"
        component={SearchView}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="foodView"
        component={FoodView}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="userProfile"
        component={ProfileView}
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
