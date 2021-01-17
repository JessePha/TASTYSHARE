import React, { useState, useEffect } from "react";
import Post from "./Post/Post";
import { View, FlatList } from "react-native";
import { projectFirestore } from "../../../config/config";
const Posts = ({
  navigation,
  posts,
  setModalVisible,
  authenticated,
  bs,
  likes,
  onRefresh,
  refreshing,
}) => {
  const [like, setLike] = useState(false);

  const handleOnLike = (userID, postID) => {
    if (authenticated.isSignedIn) {
      if (like) {
        onDislike(userID, postID);
      } else {
        onLike(userID, postID);
      }
      setLike(!like);
    } else {
      bs.current.snapTo(0);
    }
  };

  const onLike = (userID, postID) => {
    projectFirestore
      .collection("posts")
      .doc(userID)
      .collection("userPosts")
      .doc(postID)
      .collection("likes")
      .doc(authenticated.currentUser.uid)
      .set({});
  };

  const onDislike = (userID, postID) => {
    projectFirestore
      .collection("posts")
      .doc(userID)
      .collection("userPosts")
      .doc(postID)
      .collection("likes")
      .doc(authenticated.currentUser.uid)
      .delete();
  };

  return (
    <View style={{ flex: 1 }}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.postID}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <Post
              item={item}
              navigation={navigation}
              setModalVisible={setModalVisible}
              handleOnLike={handleOnLike}
              likes={likes}
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default Posts;
