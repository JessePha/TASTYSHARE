import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogInView from "../../view/LoginView";
import MainView from "../../view/MainView";
import SignUpView from "../../view/RegisterView";
import ProfileView from "../../view/ProfileView";
import FoodView from "../../view/FoodView";
import ForgetPasswordView from "../../view/ForgetPasswordView";
import LoadingScreen from "../../view/LoadingView";
import Header from "../../components/Header/Header";

const AuthStack = createStackNavigator();

export const HomeStack = ({ auth }) => {
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
        options={({ navigation, route }) => ({
          headerTitle: () =>
            auth ? null : (
              <Header navigation={navigation} logoSize={25} color="white" />
            ),
        })}
      />
      <AuthStack.Screen name="Log in" component={LogInView} />
      <AuthStack.Screen name="Register" component={SignUpView} />
      <AuthStack.Screen name="forgetPassword" component={ForgetPasswordView} />
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
