import React, { useState, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { onEditComment } from "../../handleLikesAndFollows/handleComments";
import { Entypo } from "@expo/vector-icons";
import { appColors } from "../../shared/global/colors/colors";

const EditCommentSheet = ({ bs, fall, editComment, setMessage }) => {
  const [text, setText] = useState(editComment.text);
  const { colors } = useTheme();
  const clearText = createRef();
  const header = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={{ ...styles.header, backgroundColor: colors.background }}>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                defaultValue={editComment.text}
                onChangeText={(input) => setText(input)}
                placeholderTextColor={appColors.inputPlaceHolderColor}
                style={{ color: colors.text }}
                ref={clearText}
              ></TextInput>
              <Entypo
                name="arrow-with-circle-right"
                size={24}
                color="darkgray"
                onPress={() =>
                  onEditComment(
                    editComment.userID,
                    editComment.postID,
                    editComment.commentID,
                    text,
                    setText,
                    clearText,
                    Keyboard,
                    bs
                  )
                }
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };
  const content = () => {
    return (
      <View style={{ ...styles.content, backgroundColor: colors.background }}>
        <Text style={{ color: colors.text }}>Edit your text</Text>
      </View>
    );
  };

  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={[300, 0]}
        renderHeader={header}
        renderContent={content}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    shadowColor: appColors.shadowColor,
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    padding: 10,
    zIndex: 100,
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
    padding: 20,
    height: 300,
  },
});

export default EditCommentSheet;
