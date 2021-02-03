import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import CustomTextInput from "../UI/CustomInput";
import { addImage } from "../../handleCamera/handleCamera";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { appColors } from "../../shared/global/colors/colors";

const bottomSheet = ({ bs, fall, postInfo, edit }) => {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const { showActionSheetWithOptions } = useActionSheet();
  let type = "post";
  const updatePost = {
    title: title.trim(),
    price: price.trim(),
    category: category.trim(),
    description: description.trim(),
    location: location.trim(),
    user: postInfo.userID,
    imageuri: image,
  };

  const content = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{ ...styles.container, backgroundColor: colors.background }}
        >
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() =>
              addImage(
                showActionSheetWithOptions,
                setImage,
                postInfo.user,
                type
              )
            }
          >
            <View
              style={{
                ...styles.imageInnerContainer,
                backgroundColor: colors.background,
                borderColor: colors.border,
              }}
            >
              {image ? (
                <Image source={{ uri: image, width: 140, height: 140 }} />
              ) : (
                <AntDesign name="camera" color={colors.text} size={50} />
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
              />
              <CustomTextInput
                space={10}
                text="Price"
                handleInput={setPrice}
                textColor={colors.text}
              />
              <CustomTextInput
                space={10}
                text="Category"
                handleInput={setCategory}
                textColor={colors.text}
              />
              <CustomTextInput
                space={10}
                text="Description"
                handleInput={setDescription}
                textColor={colors.text}
              />
              <CustomTextInput
                space={10}
                text="Location"
                handleInput={setLocation}
                textColor={colors.text}
              />
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => edit(updatePost)}
            >
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => bs.current.snapTo(1)}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={["80%", 0]}
        renderContent={content}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        enabledInnerScrolling={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: appColors.bottomSheetHeaderBgColor,
    shadowColor: appColors.shadowColor,
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
  },
  padnelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 30,
    height: 5,
    borderRadius: 4,
    backgroundColor: appColors.panelHandle,
    marginBottom: 10,
  },
  content: {
    alignItems: "center",
    backgroundColor: "darkgray",
    padding: 20,
  },
  container: {
    height: Dimensions.get("screen").height,
    backgroundColor: "darkgray",
  },
  imageContainer: {
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  imageInnerContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 5,
  },
  inputContainer: {
    height: 300,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    padding: 10,
    backgroundColor: appColors.editButton,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    marginBottom: 10,
    borderRadius: 30,
  },
  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: appColors.cancelButton,
    width: 150,
    borderRadius: 30,
  },
  text: {
    fontSize: 14,
    color: appColors.text,
  },
});

export default bottomSheet;
