import React from "react";
import Post from "./Post/Post";
import { View, FlatList } from "react-native";
const Posts = ({
  navigation,
  posts,
  setModalVisible,
  authenticated,
  onRefresh,
  refreshing,
}) => {

  return (
    <View style={{ flex: 1 }}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.postID}
          refreshing={refreshing}
          onRefresh={() => onRefresh(true)}
          renderItem={({ item }) => (
            <Post
              item={item}
              navigation={navigation}
              setModalVisible={setModalVisible}
              authenticated={authenticated}
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default Posts;
