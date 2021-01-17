import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import CustomInput from "../components/UI/CustomInput";
import CustomButton from "../components/UI/CustomButton";
import CustomLinkText from "../components/UI/CustomLinkText";
import LoadingScreen from "../view/LoadingView";
import Logo from "../components/UI/Logo";
import { auth } from "../../config/config";

const LoginView = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const texts = [
    { text: "Email address", inputValue: email, handleInput: setEmail },
    {
      text: "Password",
      showPassword: showPassword,
      setShowPassword: setShowPassword,
      inputValue: password,
      handleInput: setPassword,
    },
  ];

  const onSignIn = async () => {
    if (email && password) {
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
    <KeyboardAvoidingView style={styles.container}>
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
    </KeyboardAvoidingView>
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
  inputContainer: {
    flex: 3,
    justifyContent: "center",
    borderBottomWidth: 0.2,
    borderBottomColor: "#fff",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  signUpContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 30,
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export default LoginView;
