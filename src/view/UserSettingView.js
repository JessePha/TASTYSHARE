import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import UserCustomBar from "../components/UI/UserCustomBar";
import CustomInput from "../components/UI/CustomInput";
import CustomButton from "../components/UI/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { addImage } from "../handleCamera/handleCamera";
import { projectFirestore } from "../../config/config";

const UserSettingView = ({ navigation, route }) => {
  const { currentUser } = route.params;
  const [image, setImage] = useState(null);
  const { showActionSheetWithOptions } = useActionSheet();
  const [newName, setNewName] = useState(currentUser.firstName);
  const [newLastName, setNewLastName] = useState(currentUser.lastName);
  const [newEmail, setNewEmail] = useState(currentUser.email);
  let type = "users";
  const { colors } = useTheme();
  const updateUser = {
    ...currentUser,
    firstName: newName,
    lastName: newLastName,
    email: newEmail,
    imageuri: image,
  };
  delete updateUser.uid;

  const handleUpdateUser = () => {
    projectFirestore
      .collection("users")
      .doc(currentUser.uid)
      .update(updateUser)
      .then(() => {})
      .catch(function (error) {});

    navigation.goBack();
  };

  return (
    <View style={styles.userSettingViewContainer}>
      <View style={styles.userSettingViewInnerContainer}>
        <UserCustomBar
          text={`${currentUser.firstName} ${currentUser.lastName}`}
          textColor={colors.text}
          bgColor={colors.iconBackgroundColor}
          image={
            <TouchableOpacity
              onPress={() =>
                addImage(
                  showActionSheetWithOptions,
                  setImage,
                  currentUser,
                  type
                )
              }
            >
              <AntDesign
                name="camera"
                size={35}
                color={colors.iconColor}
                style={styles.camera}
              />
              {image || currentUser.imageuri ? (
                <Image
                  source={{ uri: image ? image : currentUser.imageuri }}
                  style={styles.image}
                />
              ) : (
                <AntDesign name="user" size={70} color={colors.iconColor} />
              )}
            </TouchableOpacity>
          }
        />
      </View>
      <View style={{ flex: 2, padding: 20 }}>
        <CustomInput text="Firstname" space={30} handleInput={setNewName} />
        <CustomInput text="Lastname" space={30} handleInput={setNewLastName} />
        <CustomInput
          text="Email-address"
          space={30}
          handleInput={setNewEmail}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="Change"
          color="#fff"
          backgroundColor="tomato"
          onClick={() => handleUpdateUser()}
        />
        <CustomButton
          text="Cancel"
          color="#fff"
          backgroundColor="lightgray"
          onClick={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userSettingViewContainer: {
    flex: 1,
  },
  userSettingViewInnerContainer: {
    flex: 2,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 2,
    alignItems: "center",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  camera: {
    position: "absolute",
    top: 5,
    marginLeft: 60
  },
});

export default UserSettingView;
