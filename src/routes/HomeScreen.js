import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../view/LoginScreen";
import MainScreen from "../view/MainScreen";
import RegisterScreen from "../view/RegisterScreen";
import ProfileScreen from "../view/ProfileScreen";
import FoodScreen from "../view/FoodScreen";
import ForgetPasswordScreen from "../view/ForgetPasswordScreen";
import SearchScreen from "../view/SearchScreen";
import LoadingScreen from "../view/LoadingScreen";
import Header from "../components/Header/Header";
import TabNavigation from "./tabNavigation/TabNavigation";
import { connect } from "react-redux";

const AuthStack = createStackNavigator();

const HomeScreen = ({ authenticated }) => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: authenticated ? false : true,
        headerStyle: {
          backgroundColor: "#5A595B",
        },
        headerTintColor: "#fff",
      }}
    >
      {authenticated ? (
        <AuthStack.Screen
          name="tab"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <AuthStack.Screen
            name="Default"
            component={MainScreen}
            options={({ navigation }) => ({
              headerShown: authenticated ? false : true,
              headerTitle: () => (
                <Header navigation={navigation} logoSize={25} color="white" />
              ),
            })}
          />
          <AuthStack.Screen name="search" component={SearchScreen} />
          <AuthStack.Screen name="Log in" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
          <AuthStack.Screen
            name="forgetPassword"
            component={ForgetPasswordScreen}
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
        </>
      )}
    </AuthStack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, null)(HomeScreen);
