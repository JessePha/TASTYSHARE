import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

const Post = ({ WIDTH, numColumn }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.ImageContainer}
        onPress={() => console.log("Go to View food")}
      >
        <Image style={{ ...styles.Image, height: WIDTH / numColumn }} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  ImageContainer: { flex: 1, padding: 5 },
  Image: {
    height: 100,
    backgroundColor: "#C4C4C4",
    margin: 3,
  },
});

export default Post;
