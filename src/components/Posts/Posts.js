import React from "react";
import Post from "./Post/Post";
import { View, FlatList } from "react-native";

const Posts = ({ navigation, posts }) => {
  const buttonTexts = ["Like", "Share"];
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post item={item} navigation={navigation} />}
        key={(item) => item.id}
      />
    </View>
  );
};

export default Posts;
