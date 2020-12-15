import React from "react";
import { View, StyleSheet } from "react-native";
import CustomText from "../components/UI/CustomText";
import CustomInput from "../components/UI/CustomInput";
import CustomButton from "../components/UI/CustomButton";

const ForgetPasswordView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <CustomText text="Find your account" />
      </View>
      <View style={styles.inputAndButtonContainer}>
        <CustomInput text="Email address" space={40} />
        <CustomButton text="Send" color="#fff" backgroundColor="#00C2FF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#5A595B",
    paddingLeft: 35,
    paddingRight: 35,
  },
  textContainer: {
    flex: 2,
  },
  inputAndButtonContainer: {
    flex: 3,
    paddingTop: 50,
  },
});
export default ForgetPasswordView;
