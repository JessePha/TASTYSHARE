import React from "react";
import Post from "./post/Post";
import { View, FlatList } from "react-native";

const UserPosts = ({ posts, navigation }) => {
  const numColumns = 2;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.postID}
        renderItem={({ item }) => <Post item={item} navigation={navigation} />}
        numColumns={numColumns}
      />
    </View>
  );
};

export default UserPosts;
