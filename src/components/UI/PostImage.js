import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const PostImage = ({ img }) => {
  return (
    <TouchableOpacity onPress={() => alert("To user profile")}>
      <View style={styles.contain}>
        <Image source={{ uri: img }} style={styles.Image} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  contain: { flex: 2 },
  Image: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height - 200,
  },
});

export default PostImage;
