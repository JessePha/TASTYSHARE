import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomeText from "../components/UI/CustomText";
import CustomeInput from "../components/UI/CustomInput";
import CustomeButton from "../components/UI/CustomButton";
import CustomeLinkText from "../components/UI/CustomLinkText";
import TextLogo from "../components/UI/Logo";
import {
  isValidfName,
  isValidlName,
  isValidEmail,
  isValidPassword,
} from "../handleValidtion/validation";
import { auth, projectFirestore } from "../../config/config";
import LoadingScreen from "../view/LoadingView";

const RegisterView = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState([]);

  const signUpTexts = [
    {
      text: "Firstname",
      inputValue: firstname,
      handleInput: setFirstname,
      isValid: msg.length > 0 && msg[0].isValid,
      msg: msg.length > 0 && msg[0].msg,
    },
    {
      text: "Lastname",
      inputValue: lastname,
      handleInput: setLastName,
      isValid: msg.length > 0 && msg[1].isValid,
      msg: msg.length > 0 && msg[1].msg,
    },
    {
      text: "Email address",
      inputValue: email,
      handleInput: setEmail,
      isValid: msg.length > 0 && msg[2].isValid,
      msg: msg.length > 0 && msg[2].msg,
    },
    {
      text: "Password",
      showPassword: showPassword,
      setShowPassword: setShowPassword,
      inputValue: password,
      handleInput: setPassword,
      isValid: msg.length > 0 && msg[3].isValid,
      msg: msg.length > 0 && msg[3].msg,
    },
  ];
  const onSignUp = async () => {
    const validfName = isValidfName(firstname);
    const validlName = isValidlName(lastname);
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(password);
    setMsg([
      { ...validfName },
      { ...validlName },
      { ...validEmail },
      { ...validPassword },
    ]);
    if (
      validfName.isValid &&
      validlName.isValid &&
      validEmail.isValid &&
      validPassword.isValid
    ) {
      setLoading(true);
      try {
        const response = await auth.createUserWithEmailAndPassword(
          email.trim(),
          password.trim()
        );
        if (response) {
          setLoading(false);
          await projectFirestore
            .collection("users")
            .doc(response.user.uid)
            .set({
              firstName: firstname,
              lastName: lastname,
              email: response.user.email,
            });
        }
      } catch (error) {
        setLoading(false);
        if (error.code == "auth/email-already-in-use") {
          alert("User already exists.Try loggin in");
        }
      }
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{
        flexGrow: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <View
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
                paddingTop: 30,
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
          <View style={{ flex: 3, justifyContent: "center" }}>
            <ScrollView>
              {signUpTexts.map((text, index) => {
                let padding = 0;
                if (signUpTexts.length - 1 === index) {
                  padding = 0;
                } else {
                  padding = 25;
                }
                return (
                  <CustomeInput
                    key={text + `${index}`}
                    text={text.text}
                    textColor="white"
                    handleInput={text.handleInput}
                    showPassword={text.showPassword}
                    setShowPassword={text.setShowPassword}
                    space={padding}
                    msg={text.msg}
                    isValid={text.isValid}
                  />
                );
              })}
            </ScrollView>
          </View>
          <View style={{ flex: 2 }}>
            <CustomeButton
              text="Sign Up"
              color="white"
              backgroundColor="#32E0C4"
              onClick={() => onSignUp()}
            />
            <CustomeLinkText
              text="Already have account ?"
              onClick={() => navigation.navigate("Log in")}
              textColor="white"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterView;
