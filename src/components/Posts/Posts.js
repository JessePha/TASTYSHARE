import React, { useState } from "react";
import Post from "./Post/Post";
import { View, FlatList } from "react-native";
import { handleOnLike } from "../../handleLikesAndFollows/handleLikes";
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
              like={like}
              setLike={setLike}
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
