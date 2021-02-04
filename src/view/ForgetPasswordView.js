import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import CustomText from "../components/UI/CustomText";
import CustomInput from "../components/UI/CustomInput";
import CustomButton from "../components/UI/CustomButton";
import { auth } from "../../config/config";
import { appColors } from "../shared/global/colors/colors";

const ForgetPasswordView = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async (userEmail) => {
    auth
      .sendPasswordResetEmail(userEmail)
      .then(() => {
        alert("The has sent to your email");
        navigation.navigate("Log in");
      })
      .catch((error) => {
        alert("Invalid email");
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.textContainer}>
            <CustomText text="Find your account" />
          </View>
          <View style={styles.inputAndButtonContainer}>
            <CustomInput
              text="Email address"
              space={40}
              handleInput={setEmail}
            />
            <Text style={{ color: "tomato" }}>{message}</Text>
            <CustomButton
              text="Send"
              color="#fff"
              backgroundColor="#00C2FF"
              onClick={() => handlePasswordReset(email)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: appColors.appBgColor,
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
