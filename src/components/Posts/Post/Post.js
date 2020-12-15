import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import UserImage from "../../UI/LinkUserImage";
import Button from "../../UI/CustomButton";

const Post = ({ texts, navigation }) => {
  console.log(navigation);
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("foodView")}>
        <View style={styles.ImageContainer}>
          <Image style={styles.Image} />
        </View>
      </TouchableOpacity>

      <View style={styles.UserLinkAndShareContainer}>
        <View style={styles.UserInfoContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("userProfile")}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "white",
                borderRadius: 20,
              }}
            ></View>
          </TouchableOpacity>
          <Text>User</Text>
        </View>
        <View style={styles.UserLikeAndShare}>
          {texts.map((text) => (
            <Button key = {text} text={text} color="white" />
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Post: {
    borderColor: "pink",
    borderWidth: 2,
  },
  ImageContainer: {},
  Image: {
    width: Dimensions.get("screen").width,
    height: 300,
    backgroundColor: "#C4C4C4",
  },
  UserInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  UserLinkAndShareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  UserLikeAndShare: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Post;
