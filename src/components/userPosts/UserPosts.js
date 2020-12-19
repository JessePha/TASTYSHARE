import React from "react";
import Post from "./post/Post";
import { View, FlatList } from "react-native";

const UserPosts = ({ posts, navigation }) => {
  const numColumns = 2;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post item={item} navigation={navigation} />}
        key={(item) => item.id}
        numColumns={numColumns}
      />
    </View>
  );
};

export default UserPosts;
