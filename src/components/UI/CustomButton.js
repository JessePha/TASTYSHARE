import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { appColors } from "../../shared/global/colors/colors";

const Button = ({ text, onClick, color, backgroundColor, disable }) => {
  let style = null;
  if (text === "Like") {
    style = styles.likeText;
  } else if (text === "Share") {
    style = styles.shareText;
  } else if (text === "Log In") {
    style = styles.logInButton;
  } else if (text === "Sign Up") {
    style = styles.signUpButton;
  } else if (text === "Send") {
    style = styles.sendButton;
  } else if (text === "Post") {
    style = styles.postButton;
  } else if (text === "Cancel") {
    style = styles.cancelButton;
  } else if (text === "Change") {
    style = styles.changeButton;
  } else {
    style = styles.appButtonText;
  }
  return (
    <TouchableOpacity
      disabled={disable}
      style={styles.appButtonContainer}
      onPress={onClick}
    >
      <Text
        style={{
          ...style,
          color: color,
          backgroundColor: disable ? "darkgray": backgroundColor,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {},
  appButtonText: {
    fontSize: 12,
    color: appColors.appButtonText,
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    paddingLeft: 12,
  },
  shareText: {
    color: appColors.shareText,
  },
  likeText: {
    color: appColors.likeText,
    paddingLeft: 5,
    paddingRight: 10,
  },
  logInButton: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
  signUpButton: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
  sendButton: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
  postButton: {
    fontSize: 14,
    padding: 10,
    backgroundColor: appColors.postButtonBgColor,
    textAlign: "center",
    width: 150,
    marginBottom: 10,
    borderRadius: 30,
  },
  changeButton: {
    fontSize: 14,
    padding: 10,
    backgroundColor: appColors.changeButtonbgColor,
    textAlign: "center",
    width: 150,
    marginBottom: 10,
    borderRadius: 30,
  },
  cancelButton: {
    fontSize: 14,
    padding: 10,
    backgroundColor: appColors.cancelButtongbColor,
    textAlign: "center",
    width: 150,
    borderRadius: 30,
  },
});

export default Button;
