import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Drawer } from "react-native-paper";
import { SimpleLineIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useTheme } from "@react-navigation/native";
import CustomBar from "../components/UI/CustomBar";
import ViewUserPosts from "../components/userPosts/ViewUserPosts";
import {
  onFollow,
  onUnfollow,
  getFollowings,
} from "../handleLikesFollowsCommentsPosts/handleFollow";
import * as actionTypes from "../shared/global/globalstates/actions/actionTypes";
import { AntDesign } from "@expo/vector-icons";

const ProfileView = ({
  route,
  allPosts,
  navigation,
  authenticated,
  fetchFollowing,
  following,
  allfollowers,
}) => {
  const { item } = route.params;
  const { colors } = useTheme();
  let isUser = false;
  const userPosts = allPosts.filter((post) => post.user === item.user);
  const [followingState, setFollowingState] = useState(false);
  const getFollowing = Object.keys(allfollowers).filter((f) => f === item.user);
  const getFollowers = Object.keys(allfollowers).filter((f) => f !== item.user);

  const followers = getFollowers
    .map((gf) => {
      const temp = allfollowers[gf].filter((t) => t === item.user);
      if (temp.length > 0) return temp.length;
      else return 0;
    })
    .reduce((a, b) => a + b, 0);

  if (authenticated.currentUser !== null) {
    isUser = authenticated.currentUser.uid !== item.user;
  }
  useEffect(() => {
    if (authenticated.isSignedIn) {
      getFollowings(authenticated.currentUser.uid, fetchFollowing);
    }
  }, [followingState]);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <View style={styles.profileContainer}>
        <CustomBar
          text={`${item.userInfo.firstName} ${item.userInfo.lastName}`}
          textColor={colors.text}
          userIconHeight={60}
          userIconWidth={60}
          bgColor={colors.card}
          height={2}
          iconBgColor={colors.iconBackgroundColor}
          image={
            item.userInfo.imageuri ? (
              <Image
                source={{ uri: item.userInfo.imageuri }}
                style={{ width: 65, height: 65, borderRadius: 35 }}
              />
            ) : (
              <AntDesign name="user" size={25} color={colors.iconColor} />
            )
          }
          icon={
            following.includes(item.user) ? (
              <SimpleLineIcons name="user-unfollow" size={18} color="white" />
            ) : (
              <SimpleLineIcons name="user-follow" size={18} color="white" />
            )
          }
          iconHeight={40}
          iconWidth={40}
          generalIconBgColor={
            following.includes(item.user) ? "tomato" : "lightgreen"
          }
          isAuth={authenticated.isSignedIn}
          isUser={isUser}
          onclick={() =>
            following.includes(item.user)
              ? onUnfollow(
                  authenticated.currentUser.uid,
                  item.user,
                  setFollowingState
                )
              : onFollow(
                  authenticated.currentUser.uid,
                  item.user,
                  setFollowingState
                )
          }
        />
      </View>
      <Drawer.Section
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.background,
            }}
          >
            <Text style={{ color: colors.text }}>posts</Text>
            <Text style={{ color: colors.text }}>{userPosts.length}</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: colors.text }}>follower</Text>
            <Text style={{ color: colors.text }}>{followers}</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: colors.text }}>Following</Text>
            <Text style={{ color: colors.text }}>
              {allfollowers[getFollowing].length}
            </Text>
          </View>
        </View>
      </Drawer.Section>
      <View style={styles.postsContainer}>
        <View style={styles.postsInnerContainer}>
          <ViewUserPosts posts={userPosts} navigation={navigation} />
        </View>
      </View>
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
});

const mapStateToProps = (state) => {
  return {
    allPosts: state.pts.posts,
    authenticated: state.auth,
    following: state.auth.following,
    allfollowers: state.pts.followers,
    users: state.pts.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFollowing: (followers) =>
      dispatch({
        type: actionTypes.FOLLOWING_USER,
        payload: followers,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
