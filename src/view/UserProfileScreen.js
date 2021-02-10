import React, { useState } from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";
import CustomBar from "../components/UI/CustomBar";
import UserPosts from "../components/userPosts/UserPosts";
import { AntDesign } from "@expo/vector-icons";

const UserProfileScreen = ({ allPosts, navigation, authenticated, route }) => {
  const { colors } = useTheme();
  const { item } = route.params;
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const userPosts = allPosts.filter(
    (post) => post.user === authenticated.currentUser.uid
  );

  const alertMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 900);
  };

  return userPosts.length > 0 ? (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.profileContainer}>
        {
          <CustomBar
            text={`${
              item ? item.userInfo.firstName : userPosts[0].userInfo.firstName
            } ${
              item ? item.userInfo.firstName : userPosts[0].userInfo.lastName
            }`}
            textColor={colors.text}
            userIconHeight={60}
            userIconWidth={60}
            bgColor={colors.card}
            height={2}
            iconBgColor={colors.iconBackgroundColor}
            image={
              userPosts[0].userInfo.imageuri ? (
                <Image
                  source={{
                    uri: item
                      ? item.userInfo.imageuri
                      : userPosts[0].userInfo.imageuri,
                  }}
                  style={{ width: 65, height: 65, borderRadius: 35 }}
                />
              ) : (
                <AntDesign name="user" size={25} color={colors.iconColor} />
              )
            }
            iconHeight={40}
            iconWidth={40}
            isAuth={authenticated.isSignedIn}
          />
        }
      </View>
      <View style={styles.postsContainer}>
        <View style={styles.postsInnerContainer}>
          <UserPosts
            posts={userPosts}
            navigation={navigation}
            alertMessage={alertMessage}
          />
        </View>
      </View>
      {showMessage ? (
        <View
          style={{
            width: 200,
            height: 40,
            backgroundColor: "gray",
            position: "absolute",
            zIndex: 100,
            bottom: 20,
            borderRadius: 3,
            left: Dimensions.get("screen").width / 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>{message}</Text>
        </View>
      ) : null}
    </View>
  ) : (
    <View
      style={{ ...styles.noPostContainer, backgroundColor: colors.background }}
    >
      <AntDesign name="meh" size={34} color={colors.text} />
      <Text style={{ color: colors.text }}>You don't have any post</Text>
      {showMessage ? (
        <View
          style={{
            width: 200,
            height: 40,
            backgroundColor: "gray",
            position: "absolute",
            zIndex: 100,
            bottom: 20,
            borderRadius: 3,
            left: Dimensions.get("screen").width / 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>{message}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    marginBottom: 10,
  },
  postsContainer: {
    flex: 7,
  },
  postsInnerContainer: {
    flex: 1,
  },
  noPostContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    allPosts: state.pts.posts,
    authenticated: state.auth,
  };
};

export default connect(mapStateToProps, null)(UserProfileScreen);
