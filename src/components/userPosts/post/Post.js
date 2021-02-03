import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { appColors } from "../../../shared/global/colors/colors";

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
    backgroundColor: appColors.imageBgColor,
  },
});

export default Post;
