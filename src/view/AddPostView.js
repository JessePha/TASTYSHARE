import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomTextInput from "../components/UI/CustomInput";
import CustomButton from "../components/UI/CustomButton";
import { connect } from "react-redux";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { addImage } from "../handleCamera/handleCamera";
import { projectFirestore } from "../../config/config";

const AddPostView = ({ navigation, currentUser }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  let type = "posts";
  const post = {
    title: title,
    price: price,
    category: category,
    description: description,
    user: currentUser.uid,
    imageuri: image,
  };

  const resetForm = () => {
    setImage(null);
    setTitle("");
    setPrice("");
    setCategory("");
    setDescription("");
  };

  const addPost = (post) => {
    setLoading(true);
    projectFirestore
      .collection("posts")
      .doc(currentUser.uid)
      .collection("userPosts")
      .add(post)
      .then(() => {
        setLoading(false), cancelPost(), resetForm();
      })
      .catch((error) => console.log(error));
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
        onPress={() =>
          addImage(showActionSheetWithOptions, setImage, currentUser, type)
        }
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
        <CustomButton
          text="Post"
          color="white"
          backgroundColor="#00C2FF"
          onClick={() => addPost(post)}
        />
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, null)(AddPostView);
