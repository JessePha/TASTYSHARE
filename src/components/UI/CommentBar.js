import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

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
              backgroundColor: "#5A595B",
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
              onPress={() => onDeleteComment(post.user, post.postID, commentID)}
            >
              <Entypo name="cross" size={25} color="white" />
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
    backgroundColor: "gray",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  text: {
    color: "white",
  },
  displayName: {
    fontSize: 10,
  },
});
export default CommentBar;
