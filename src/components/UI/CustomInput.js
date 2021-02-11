import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { appColors } from "../../shared/global/colors/colors";

const CustomInput = ({
  text,
  textColor,
  space,
  handleInput,
  showPassword,
  setShowPassword,
  msg,
  isValid,
  createRef,
}) => {
  let eye = showPassword ? (
    <Entypo
      onPress={() => setShowPassword(false)}
      name="eye-with-line"
      style={styles.eyeIcon}
    />
  ) : (
    <AntDesign
      onPress={() => setShowPassword(true)}
      name="eye"
      style={styles.eyeIcon}
    />
  );
  const checkInputType = (text) => {
    switch (text) {
      case "Firstname":
        return (
          <TextInput
            placeholder={text}
            maxLength={15}
            placeholderTextColor={appColors.inputPlaceHolderColor}
            style={{ ...styles.textInput, color: textColor }}
            onChangeText={(input) => handleInput(input.trim())}
          />
        );
      case "Lastname":
        return (
          <TextInput
            placeholder={text}
            maxLength={15}
            placeholderTextColor={appColors.inputPlaceHolderColor}
            style={{ ...styles.textInput, color: textColor }}
            onChangeText={(input) => handleInput(input.trim())}
          />
        );
      case "Email address":
        return (
          <TextInput
            placeholder={text}
            maxLength={50}
            placeholderTextColor={appColors.inputPlaceHolderColor}
            style={{ ...styles.textInput, color: textColor }}
            onChangeText={(input) => handleInput(input.trim())}
          />
        );
      case "Password":
        return (
          <TextInput
            secureTextEntry={showPassword}
            placeholder={text}
            placeholderTextColor={appColors.inputPlaceHolderColor}
            style={{ ...styles.textInput, color: textColor }}
            onChangeText={(input) => handleInput(input.trim())}
          />
        );
      case "Title":
        return (
          <TextInput
            maxLength={50}
            placeholder={text}
            placeholderTextColor={appColors.inputPlaceHolderColor}
            style={{ ...styles.textInput, color: textColor }}
            onChangeText={(input) => handleInput(input.trim())}
            ref={createRef}
          />
        );
      case "Price":
        return (
          <TextInput
            maxLength={20}
            placeholder={text}
            placeholderTextColor={appColors.inputPlaceHolderColor}
            style={{ ...styles.textInput, color: textColor }}
            onChangeText={(input) => handleInput(input.trim())}
            ref={createRef}
          />
        );
      case "Category":
        return (
          <TextInput
            maxLength={30}
            placeholder={text}
            placeholderTextColor={appColors.inputPlaceHolderColor}
            style={{ ...styles.textInput, color: textColor }}
            onChangeText={(input) => handleInput(input.trim())}
            ref={createRef}
          />
        );
      case "Description":
        return (
          <TextInput
            multiline
            numberOfLines={10}
            placeholder={text}
            placeholderTextColor={appColors.inputPlaceHolderColor}
            style={{
              ...styles.textInput,
              color: textColor,
            }}
            onChangeText={(input) => handleInput(input.trim())}
            ref={createRef}
          />
        );
      case "Location":
        return (
          <TextInput
            maxLength={50}
            placeholder={text}
            placeholderTextColor={appColors.inputPlaceHolderColor}
            style={{ ...styles.textInput, color: textColor }}
            onChangeText={(input) => handleInput(input.trim())}
            ref={createRef}
          />
        );
      default:
        return (
          <TextInput
            multiline
            placeholder={text}
            placeholderTextColor={appColors.inputPlaceHolderColor}
            style={{ ...styles.textInput, color: textColor }}
            onChangeText={(input) => handleInput(input.trim())}
            ref={createRef}
          />
        );
    }
  };
  return (
    <View style={{ ...styles.TextInputContainer, paddingBottom: space }}>
      {checkInputType(text)}
      {text === "Password" && eye}
      {isValid ? null : <Text style={{ color: appColors.error }}>{msg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  TextInputContainer: {
    paddingBottom: 45,
  },
  textInput: {
    height: 40,
    paddingLeft: 6,
    borderBottomColor: appColors.underlineColorAndroid,
    borderBottomWidth: 1,
  },
  eyeIcon: {
    fontSize: 20,
    color: appColors.eyeIcon,
    position: "absolute",
    right: 10,
    top: 10,
  },
});

export default CustomInput;
