import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

const Post = ({ item, navigation }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.ImageContainer}
        onPress={() => navigation.navigate("foodView", { item })}
      >
        <Image source={{ uri: item.imageuri }} style={{ ...styles.Image }} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  ImageContainer: { flex: 1 },
  Image: {
    width: 300,
    height: 300,
    backgroundColor: "#C4C4C4",
  },
});

export default Post;
