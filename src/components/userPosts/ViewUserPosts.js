import React from "react";
import Post from "./post/Post";
import { View, FlatList } from "react-native";

const ViewUserPosts = ({ posts, navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.postID}
        renderItem={({ item }) => <Post item={item} navigation={navigation} />}
      />
    </View>
  );
};

export default ViewUserPosts;
