import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { Drawer } from "react-native-paper";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { projectFirestore } from "../../../../config/config";

const Post = ({ item, navigation, handleOnLike, authenticated, bs }) => {
  const { colors } = useTheme();
  const [like, setLike] = useState(false);
  useEffect(() => {
    if (authenticated.currentUser) {
      projectFirestore
        .collection("posts")
        .doc(item.user)
        .collection("userPosts")
        .doc(item.postID)
        .collection("likes")
        .doc(authenticated.currentUser.uid)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            setLike(true);
          } else setLike(false);
        });
    }
  }, [like]);

  const onNavigate = () => {
    if (authenticated.currentUser) {
      item.user === authenticated.currentUser.uid
        ? navigation.navigate("Profile", { screen: "userpost" })
        : navigation.navigate("userProfile", { item });
    } else {
      navigation.navigate("userProfile", { item });
    }
  };

  return (
    <View style={styles.container}>
      <Drawer.Section>
        <TouchableOpacity
          onPress={() => navigation.navigate("foodView", { item })}
        >
          <View style={styles.ImageContainer}>
            <Image source={{ uri: item.imageuri }} style={styles.Image} />
          </View>
        </TouchableOpacity>
      </Drawer.Section>
      <Drawer.Section>
        <View
          style={{
            ...styles.UserLinkAndShareContainer,
            backgroundColor: colors.background,
          }}
        >
          <View style={styles.UserInfoContainer}>
            <TouchableOpacity onPress={() => onNavigate()}>
              {item.userInfo.imageuri ? (
                <Image
                  source={{ uri: item.userInfo.imageuri }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
              ) : (
                <View
                  style={{
                    ...styles.userImage,
                    backgroundColor: colors.iconBackgroundColor,
                  }}
                >
                  <AntDesign name="user" size={20} color={colors.iconColor} />
                </View>
              )}
            </TouchableOpacity>
            <Text
              style={{ ...styles.userName, color: colors.text }}
            >{`${item.userInfo.firstName} ${item.userInfo.lastName}`}</Text>
          </View>
          <View style={styles.UserLikeAndShare}>
            <AntDesign
              name={like ? "like1" : "like2"}
              size={20}
              color={colors.iconBackgroundColor}
              onPress={() =>
                handleOnLike(
                  authenticated,
                  item.user,
                  item.postID,
                  like,
                  setLike,
                  bs
                )
              }
            />
            <Entypo
              name="share"
              size={20}
              color={colors.iconBackgroundColor}
              style={{ marginLeft: 10, marginRight: 10 }}
              onPress={() => onShare()}
            />
          </View>
        </View>
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Image: {
    width: Dimensions.get("screen").width,
    height: 300,
  },
  UserInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    display: "flex",
    width: 40,
    height: 40,
    borderRadius: 20,
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
