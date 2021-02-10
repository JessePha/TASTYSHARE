import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import SavedPost from "../components/SavedPost/SavedPost";

const SavedPostScreen = ({ navigation, savedPostIDs, posts }) => {
  const savedPosts = posts.filter((post) => savedPostIDs.includes(post.postID));
  const { colors } = useTheme();
  return savedPosts.length > 0 ? (
    <View style={styles.container}>
      <FlatList
        data={savedPosts}
        keyExtractor={(item) => item.postID}
        renderItem={({ item }) => (
          <SavedPost item={item} navigation={navigation} />
        )}
      />
    </View>
  ) : (
    <View
      style={{ ...styles.noPostContainer, backgroundColor: colors.background }}
    >
      <AntDesign name="meh" size={34} color={colors.text} />
      <Text style={{ color: colors.text }}>You don't have any saved post</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  noPostContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    savedPostIDs: state.auth.savedPosts,
    posts: state.pts.posts,
  };
};

export default connect(mapStateToProps, null)(SavedPostScreen);
