import React, { useState } from "react";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import CustomeText from "../components/UI/CustomText";
import CustomeInput from "../components/UI/CustomInput";
import CustomeButton from "../components/UI/CustomButton";
import CustomeLinkText from "../components/UI/CustomLinkText";
import TextLogo from "../components/UI/Logo";
import { auth, projectFirestore } from "../../config/config";
import { cos } from "react-native-reanimated";

const RegisterView = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpTexts = [
    { text: "Firstname", inputValue: firstname, handleInput: setFirstname },
    { text: "LastName", inputValue: lastname, handleInput: setLastName },
    { text: "Email address", inputValue: email, handleInput: setEmail },
    {
      text: "Password",
      showPassword: showPassword,
      setShowPassword: setShowPassword,
      inputValue: password,
      handleInput: setPassword,
    },
  ];

  const onSignUp = async () => {
    const user = {
      firstName: firstname,
      lastName: lastname,
    };

    if (firstname && lastname && email && password) {
      setLoading(true);
      try {
        const response = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        if (response) {
          setLoading(false);
          await projectFirestore
            .collection("users")
            .doc(response.user.uid)
            .set({
              ...user,
              email: response.user.email,
            });
          navigation.navigate("Log in");
        }
      } catch (error) {
        setState({ isLoading: false });
        if (error.code == "auth/email-already-in-use") {
          alert("User already exists.Try loggin in");
        }
        console.log(error);
      }
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{
        flexGrow: 1,
        paddingLeft: 35,
        paddingRight: 35,
        backgroundColor: "#5A595B",
      }}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomeText text="Sign up to" />
          <TextLogo size={30} />
        </View>
      </View>
      <View style={{ flex: 1.5, justifyContent: "center" }}>
        <ScrollView>
          {signUpTexts.map((text, index) => {
            let padding = 0;
            if (signUpTexts.length - 1 === index) {
              padding = 0;
            } else {
              padding = 30;
            }
            return (
              <CustomeInput
                key={text + `${index}`}
                text={text.text}
                handleInput={text.handleInput}
                showPassword={text.showPassword}
                setShowPassword={text.setShowPassword}
                space={padding}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <CustomeButton
          text="Sign Up"
          color="white"
          backgroundColor="#32E0C4"
          onClick={() => onSignUp()}
        />
        <CustomeLinkText
          text="Already have account ?"
          onClick={() => navigation.navigate("Log in")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterView;
