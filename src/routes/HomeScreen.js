import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogInView from "../view/LoginView";
import MainView from "../view/MainView";
import SignUpView from "../view/RegisterView";
import ProfileView from "../view/ProfileView";
import FoodView from "../view/FoodView";
import ForgetPasswordView from "../view/ForgetPasswordView";
import LoadingScreen from "../view/LoadingView";
import Header from "../components/Header/Header";
import TabNavigation from "./tabNavigation/TabNavigation";
import { connect } from "react-redux";

const AuthStack = createStackNavigator();

const HomeScreen = ({ authenticated}) => {
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
            component={MainView}
            options={({ navigation }) => ({
              headerShown: authenticated ? false : true,
              headerTitle: () => (
                <Header navigation={navigation} logoSize={25} color="white" />
              ),
            })}
          />
          <AuthStack.Screen name="Log in" component={LogInView} />
          <AuthStack.Screen name="Register" component={SignUpView} />
          <AuthStack.Screen
            name="forgetPassword"
            component={ForgetPasswordView}
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
