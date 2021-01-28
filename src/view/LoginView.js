import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomInput from "../components/UI/CustomInput";
import CustomButton from "../components/UI/CustomButton";
import CustomLinkText from "../components/UI/CustomLinkText";
import LoadingScreen from "../view/LoadingView";
import Logo from "../components/UI/Logo";
import { isValidEmail, isValidPassword } from "../handleValidtion/validation";
import { auth } from "../../config/config";

const LoginView = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState([]);
  const texts = [
    {
      text: "Email address",
      inputValue: email,
      handleInput: setEmail,
      isValid: msg.length > 0 && msg[0].isValid,
      msg: msg.length > 0 && msg[0].msg,
    },
    {
      text: "Password",
      showPassword: showPassword,
      setShowPassword: setShowPassword,
      inputValue: password,
      handleInput: setPassword,
      isValid: msg.length > 0 && msg[1].isValid,
      msg: msg.length > 0 && msg[1].msg,
    },
  ];

  const onSignIn = async () => {
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(password);
    setMsg([{ ...validEmail }, { ...validPassword }]);
    if (validEmail.isValid && validPassword.isValid) {
      setLoading(true);
      try {
        const response = await auth.signInWithEmailAndPassword(email, password);
        if (response) {
          setLoading(false);
          navigation.goBack();
        }
      } catch (error) {
        setLoading(false);
        switch (error.code) {
          case "auth/user-not-found":
            alert("Email does not exist. Try signing Up");
            break;
          case "auth/invalid-email":
            alert("Please enter an email address");
        }
      }
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <Logo size={30} />
          </View>
          <View style={styles.inputContainer}>
            {texts.map((text, index) => {
              let padding = 0;
              if (texts.length - 1 === index) {
                padding = 25;
              } else {
                padding = 40;
              }
              return (
                <CustomInput
                  key={text + `${index}`}
                  text={text.text}
                  handleInput={text.handleInput}
                  showPassword={text.showPassword}
                  setShowPassword={text.setShowPassword}
                  space={padding}
                  msg={text.msg}
                  isValid={text.isValid}
                />
              );
            })}
            <CustomButton
              text="Log In"
              color="white"
              backgroundColor="#00C2FF"
              onClick={() => onSignIn()}
            />
            <CustomLinkText
              text="Forget password?"
              onClick={() => navigation.navigate("forgetPassword")}
              textColor="#C4C4C4"
            />
          </View>
          <View style={styles.signUpContainer}>
            <CustomButton
              text="Sign Up"
              color="white"
              backgroundColor="#32E0C4"
              onClick={() => navigation.navigate("Register")}
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
    flex: 1,
    display: "flex",
    backgroundColor: "#5A595B",
    paddingLeft: 35,
    paddingRight: 35,
  },
  inputContainer: {
    flex: 3,
    justifyContent: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "#fff",
  },
  logoContainer: {
    paddingTop:30,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  signUpContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export default LoginView;
