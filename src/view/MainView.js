import React from "react";
import { View } from "react-native";
import Header from "../components/Header/Header";
import Posts from "../components/Posts/Posts";
import SettingView from "../view/SettingView";
import LoginView from "../view/LoginView";
import RegisterView from "../view/RegisterView";
import ForgetPasswordView from "../view/ForgetPasswordView";
import FoodView from "../view/FoodView";
import ProfileView from "../view/ProfileView";
const MainView = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 8, backgroundColor: "#5A595B" }}>
        <Posts navigation={navigation} />
      </View>
    </View>
  );
};

export default MainView;
