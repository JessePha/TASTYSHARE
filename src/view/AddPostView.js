import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomTextInput from "../components/UI/CustomInput";
import CustomButton from "../components/UI/CustomButton";
import * as cameraAndImageHelper from "../../src/helpers/handleCameraAndImage";
import { useActionSheet } from "@expo/react-native-action-sheet";

const AddPostView = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const { showActionSheetWithOptions } = useActionSheet();

  const uploadImage = async (image) => {
    setImage(image.uri);
    const blob = await ImageHelpers.prepareBlob(image.uri);
  };

  const openImageLibrary = async (selectedBook) => {
    const result = await cameraAndImageHelper.openImageLibrary();
    setImage(result.uri);
    if (result) {
      const downloadUrl = await uploadImage(result);
    }
  };

  const openCamera = async (selectedBook) => {
    const result = await cameraAndImageHelper.openCamera();
    if (result) {
      const downloadUrl = await uploadImage(result, selectedBook);
    }
  };

  const addPostImage = () => {
    const options = ["Select from Photos", "Camera", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          openImageLibrary();
        } else if (buttonIndex == 1) {
          openCamera();
        }
      }
    );
  };
  const cancelPost = () => {
    setImage(null);
    navigation.navigate("Home");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#5A595B",
      }}
    >
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={() => addPostImage()}
      >
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: "darkgray",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "white",
            borderWidth: 5,
            borderRadius: 5,
          }}
        >
          {image ? (
            <Image source={{ uri: image, width: 190, height: 190 }} />
          ) : (
            <AntDesign name="camera" color="white" size={50} />
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <CustomTextInput space={20} text="Title" handleInput={setTitle} />
        <CustomTextInput space={20} text="Price" handleInput={setPrice} />
        <CustomTextInput space={20} text="Category" handleInput={setCategory} />
        <CustomTextInput
          space={20}
          text="Description"
          handleInput={setDescription}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <CustomButton text="Post" color="white" backgroundColor="#00C2FF" />
        <CustomButton
          text="Cancel"
          color="white"
          backgroundColor="lightgray"
          onClick={() => cancelPost()}
        />
      </View>
    </View>
  );
};

export default AddPostView;
