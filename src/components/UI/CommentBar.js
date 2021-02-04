import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appColors } from "../../shared/global/colors/colors";

const CommentBar = ({
  text,
  textColor,
  displayName,
  uri,
  userID,
  commentID,
  currentUser,
  onDeleteComment,
  post,
  setEditComment,
  bs,
  bs1,
  alertMessage,
}) => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
      }}
    >
      <View style={{ alignItems: "flex-start" }}>
        {uri ? (
          <Image
            source={{ uri: uri }}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        ) : (
          <View
            style={{
              display: "flex",
              width: 30,
              height: 30,
              backgroundColor: appColors.commentBarUserContainerBgColor,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="user" size={15} color="white" />
          </View>
        )}
        <View>
          <Text style={{ ...styles.displayName, color: textColor }}>
            {displayName}
          </Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        <View style={{ position: "absolute", right: 0 }}>
          {currentUser === userID ? (
            <TouchableOpacity
              onPress={() => onDeleteComment(post.user, post.postID, commentID, alertMessage)}
            >
              <Entypo name="cross" size={25} color="white" />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{ position: "absolute", right: 30, top: 5 }}>
          {currentUser === userID ? (
            <TouchableOpacity
              onPress={() => {
                bs1.current.snapTo(0),
                  bs.current.snapTo(1),
                  setEditComment({
                    text: text,
                    postID: post.postID,
                    userID: post.user,
                    commentID: commentID,
                  });
              }}
            >
              <Feather name="edit-2" size={15} color="white" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    backgroundColor: appColors.commentBarTextContainerBgColor,
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  text: {
    color: appColors.text,
  },
  displayName: {
    fontSize: 10,
  },
});
export default CommentBar;
