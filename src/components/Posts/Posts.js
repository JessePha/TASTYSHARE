import React from "react";
import Post from "./Post/Post";
import { View, Text, FlatList, ScrollView, RefreshControl } from "react-native";
import { handleOnLike } from "../../handleLikesAndFollows/handleLikes";
import { useTheme } from "@react-navigation/native";
const Posts = ({
  navigation,
  posts,
  setModalVisible,
  authenticated,
  bs,
  onRefresh,
  refreshing,
}) => {
  const { colors } = useTheme();
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
              handleOnLike={handleOnLike}
              bs={bs}
              authenticated={authenticated}
            />
          )}
        />
      ) : null}
    </View>
  );
};

export default Posts;
