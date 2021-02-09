import React, { useState, createRef, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CustomTextInput from "../components/UI/CustomInput";
import CustomButton from "../components/UI/CustomButton";
import { connect } from "react-redux";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { addImage } from "../handleCamera/handleCamera";
import { useTheme } from "@react-navigation/native";
import firebase from "firebase";
import { onAddPost } from "../handleLikesFollowsCommentsPosts/handlePost";
import LoadingScreen from "../view/LoadingView";

const AddPostView = ({ navigation, currentUser }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const [disable, setDisable] = useState(true);
  let type = "posts";
  const { colors } = useTheme();
  const clearText = createRef();
  const post = {
    title: title.trim(),
    price: price.trim(),
    category: category.trim(),
    description: description.trim(),
    location: location.trim(),
    user: currentUser !== null && currentUser.uid,
    imageuri: image,
    likesCount: 0,
    createAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const resetForm = () => {
    setImage(null);
    setTitle("");
    setPrice("");
    setCategory("");
    setDescription("");
  };

  useEffect(() => {
    if (image !== null) setDisable(false);
    else setDisable(true);
  }, [image]);

  const addPost = (currentUser, post, setLoading) => {
    if (currentUser !== null && image !== null) {
      onAddPost(currentUser, post, setLoading);
    }
    cancelPost();
  };

  const cancelPost = () => {
    setImage(null);
    resetForm();
    clearText.current.clear();
    navigation.navigate("Home");
  };

  if (loading) return <LoadingScreen />;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            addImage(showActionSheetWithOptions, setImage, currentUser, type)
          }
        >
          <View
            style={{
              ...styles.imageInnerContainer,
              backgroundColor: colors.iconBackgroundColor,
              borderColor: colors.border,
            }}
          >
            {image ? (
              <Image source={{ uri: image, width: 140, height: 140 }} />
            ) : (
              <AntDesign name="camera" color={colors.iconColor} size={50} />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <ScrollView>
            <CustomTextInput
              space={10}
              text="Title"
              handleInput={setTitle}
              textColor={colors.text}
              createRef={clearText}
            />
            <CustomTextInput
              space={10}
              text="Price"
              handleInput={setPrice}
              textColor={colors.text}
              createRef={clearText}
            />
            <CustomTextInput
              space={10}
              text="Category"
              handleInput={setCategory}
              textColor={colors.text}
              createRef={clearText}
            />
            <CustomTextInput
              space={10}
              text="Location"
              handleInput={setLocation}
              textColor={colors.text}
              createRef={clearText}
            />
            <CustomTextInput
              space={10}
              text="Description"
              handleInput={setDescription}
              textColor={colors.text}
              createRef={clearText}
            />
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            text="Post"
            color="white"
            backgroundColor="#00C2FF"
            disable={disable}
            onClick={() => addPost(currentUser.uid, post, setLoading)}
          />
          <CustomButton
            text="Cancel"
            color="white"
            backgroundColor="lightgray"
            onClick={() => cancelPost()}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: { flex: 2, justifyContent: "center", alignItems: "center" },
  imageInnerContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 5,
  },
  inputContainer: {
    flex: 2,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps, null)(AddPostView);
