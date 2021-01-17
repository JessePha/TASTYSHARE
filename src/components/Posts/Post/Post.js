import React from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Share,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Post = ({ item, navigation, handleOnLike, likes }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("foodView", { item })}
      >
        <View style={styles.ImageContainer}>
          <Image source={{ uri: item.imageuri }} style={styles.Image} />
        </View>
      </TouchableOpacity>

      <View style={styles.UserLinkAndShareContainer}>
        <View style={styles.UserInfoContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("userProfile", { item })}
          >
            {item.userInfo.imageuri ? (
              <Image
                source={{ uri: item.userInfo.imageuri }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            ) : (
              <View
                style={{
                  display: "flex",
                  width: 40,
                  height: 40,
                  backgroundColor: "white",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="user" size={20} color="gray" />
              </View>
            )}
          </TouchableOpacity>
          <Text
            style={styles.userName}
          >{`${item.userInfo.firstName} ${item.userInfo.lastName}`}</Text>
        </View>
        <View style={styles.UserLikeAndShare}>
          <AntDesign
            name={likes && likes.includes(item.postID) ? "like1" : "like2"}
            size={20}
            color="white"
            onPress={() => handleOnLike(item.user, item.postID)}
          />
          <Entypo
            name="share"
            size={20}
            color="white"
            style={{ marginLeft: 5 }}
            onPress={() => onShare()}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  userName: { marginLeft: 10, color: "#fff" },
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

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth,
  };
};

export default connect(mapStateToProps, null)(Post);
