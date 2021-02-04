import React, { useState, useEffect, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CommentBar from "../UI/CommentBar";
import { connect } from "react-redux";
import * as actionTypes from "../../shared/global/globalstates/actions/actionTypes";
import { getAllComments } from "../../handleLikesFollowsCommentsPosts/handleComments";
import { appColors } from "../../shared/global/colors/colors";

const bottomSheet = ({
  authenticated,
  post,
  navigation,
  bs,
  bs2,
  fall,
  contentType,
  handleOnComment,
  onDeleteComment,
  setEditComment,
  users,
  getComments,
  comments,
  alertMessage,
}) => {
  const [text, setText] = useState();
  const [commentState, setCommentState] = useState(false);
  const { colors } = useTheme();
  const clearText = createRef();
  useEffect(() => {
    const unsubscribe = () => {
      getAllComments(post.user, post.postID, users, getComments);
    };
    unsubscribe();
    return () => unsubscribe();
  }, [commentState]);

  const onComment = () => {
    setCommentState(!commentState);
    Keyboard.dismiss;
    setText("");
    clearText.current.clear();
    handleOnComment(
      authenticated,
      post.user,
      post.postID,
      bs,
      text,
      alertMessage
    );
    bs.current.snapTo(1);
  };

  const header = () => {
    if (contentType === "comment")
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback>
            <View
              style={{ ...styles.header, backgroundColor: colors.background }}
            >
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    placeholder="Write a comment"
                    value={text}
                    onChangeText={(input) => setText(input)}
                    placeholderTextColor={appColors.inputPlaceHolderColor}
                    style={{ color: colors.text }}
                    ref={clearText}
                  ></TextInput>
                  <Entypo
                    name="arrow-with-circle-right"
                    size={24}
                    color="darkgray"
                    onPress={() => onComment()}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
    else if (contentType === "notLogin")
      return (
        <View style={styles.header}>
          <View style={styles.padnelHeader}>
            <View style={styles.panelHandle}></View>
          </View>
        </View>
      );
  };
  const content = () => {
    if (contentType === "comment") {
      if (comments.length > 0) {
        return (
          <View
            style={{ ...styles.comment, backgroundColor: colors.background }}
          >
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              style={{ zIndex: 100 }}
              renderItem={({ item }) => (
                <CommentBar
                  text={item.text}
                  textColor={colors.text}
                  displayName={`${item.userInfo.firstName} ${item.userInfo.lastName}`}
                  uri={item.userInfo.imageuri}
                  userID={item.userInfo.id}
                  commentID={item.id}
                  currentUser={authenticated.currentUser.uid}
                  onDeleteComment={onDeleteComment}
                  setEditComment={setEditComment}
                  post={post}
                  bs={bs}
                  bs1={bs2}
                  alertMessage={alertMessage}
                />
              )}
            />
          </View>
        );
      } else {
        return (
          <View
            style={{ ...styles.noComment, backgroundColor: colors.background }}
          >
            <Text style={{ color: colors.text }}>No comments</Text>
            <FontAwesome name="comment-o" size={24} color={colors.text} />
          </View>
        );
      }
    } else if (contentType === "notLogin") {
      return (
        <View style={styles.content}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: colors.text, fontSize: 20, paddingRight: 10 }}
              >
                Join
              </Text>
              <Text style={{ color: appColors.logo, fontSize: 22 }}>
                TASTYSHARE
              </Text>
              <Text style={{ fontSize: 20, color: colors.text }}> !</Text>
            </View>
            <Text style={{ color: colors.text }}>
              Sign up to like and share your content
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: colors.text }}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Log in")}>
              <Text style={{ color: colors.text }}>Already have account ?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
              <Text style={{ color: colors.text }}>Mabe later</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
    backgroundColor: "white",
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
    justifyContent: "space-around",
    backgroundColor: appColors.bottomSheetContent,
    height: 280,
  },

  comment: {
    backgroundColor: appColors.bottomSheetComment,
    padding: 20,
    height: 300,
  },
  noComment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: appColors.bottomSheetComment,
    height: 300,
  },
  buttonContainer: { justifyContent: "center", alignItems: "center" },
  textContainer: { justifyContent: "center", alignItems: "center" },
});

const mapStateToProps = (state) => {
  return {
    comments: state.auth.comments,
    users: state.pts.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (comments) =>
      dispatch({ type: actionTypes.GET_COMMENTS, payload: comments }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(bottomSheet);
