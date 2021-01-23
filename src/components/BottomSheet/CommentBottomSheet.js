import React, { useState, useEffect } from "react";
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
import { projectFirestore } from "../../../config/config";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CommentBar from "../UI/CommentBar";
import { connect } from "react-redux";
import * as actionTypes from "../../shared/global/globalstates/actions/actionTypes";

const bottomSheet = ({
  authenticated,
  post,
  navigation,
  bs,
  fall,
  contentType,
  handleOnComment,
  onDeleteComment,
  getComments,
  comments,
}) => {
  const [text, setText] = useState();
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [com, setCom] = useState([]);
  useEffect(() => {
    projectFirestore
      .collection("users")
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { ...data, id };
        });
        setUsers(users);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = () => {
      projectFirestore
        .collection("posts")
        .doc(post.user)
        .collection("userPosts")
        .doc(post.postID)
        .collection("comments")
        .onSnapshot((snapshot) => {
          const comments = [];
          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            users.map((user) => {
              if (user.id === data.creator) {
                user = { userInfo: { ...user }, ...data, id };
                comments.push(user);
              }
            });
          });
          setCom(comments);
          getComments(comments);
        });
    };
    unsubscribe();
  }, [users]);
  const header = () => {
    if (contentType === "comment")
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.header}>
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
                    onChangeText={(input) => onType(input)}
                    clearButtonMode="always"
                  ></TextInput>
                  {show ? (
                    <Entypo
                      name="arrow-with-circle-right"
                      size={24}
                      color="gray"
                      onPress={onComment}
                    />
                  ) : null}
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
      if (comments.length || com.length > 0) {
        return (
          <View style={{ ...styles.comment }}>
            <FlatList
              data={com}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CommentBar
                  text={item.text}
                  displayName={`${item.userInfo.firstName} ${item.userInfo.lastName}`}
                  uri={item.userInfo.imageuri}
                  userID={item.userInfo.id}
                  commentID={item.id}
                  currentUser={authenticated.currentUser.uid}
                  onDeleteComment={onDeleteComment}
                  post={post}
                />
              )}
            />
          </View>
        );
      } else {
        return (
          <View style={styles.noComment}>
            <Text style={styles.noCommentText}>No comments</Text>
            <FontAwesome name="comment-o" size={24} color="lightgray" />
          </View>
        );
      }
    } else if (contentType === "notLogin") {
      return (
        <View style={styles.content}>
          <Text>Join TastyShare!</Text>
          <Text>Sign up to like and share your content</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Log in")}>
            <Text>Already have account ?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => bs.current.snapTo(1)}>
            <Text>Mabe later</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const onComment = () => {
    handleOnComment(authenticated, post.user, post.postID, bs, text);
    bs.current.snapTo(1);
  };

  const onType = (input) => {
    setText(input);
    if (text === "") setShow(false);
    else setShow(true);
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
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    padding: 10,
  },
  padnelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 30,
    height: 5,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  content: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    height: 250,
  },
  comment: {
    backgroundColor: "white",
    padding: 20,
    height: 300,
  },
  noComment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 300,
  },
  noCommentText: {
    color: "lightgray",
  },
});

const mapStateToProps = (state) => {
  return {
    comments: state.auth.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getComments: (comments) =>
      dispatch({ type: actionTypes.GET_COMMENTS, payload: comments }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(bottomSheet);
