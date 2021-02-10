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
import { isValidEmail } from "../handleValidtion/validation";

const ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (userEmail) => {
    const message = isValidEmail(userEmail);
    setMessage(message.msg);
    if (message.isValid) {
      auth
        .sendPasswordResetEmail(userEmail)
        .then(() => {
          alert("The link has sent to your email");
          navigation.navigate("Log in");
        })
        .catch((error) => {
          alert("Invalid email");
        });
    }
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
              textColor="#fff"
              handleInput={setEmail}
            />
            <Text style={{ color: "tomato", marginBottom: 10 }}>{message}</Text>
            <CustomButton
              text="Send"
              color="#fff"
              backgroundColor="#00C2FF"
              onClick={() => handlePasswordReset(email.trim())}
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
export default ForgetPasswordScreen;
