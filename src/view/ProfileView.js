import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import CustomBar from "../components/UI/CustomBar";
import UserPosts from "../components/userPosts/UserPosts";
import { projectFirestore } from "../../config/config";
import * as actionTypes from "../shared/global/globalstates/actions/actionTypes";
import { AntDesign } from "@expo/vector-icons";

const ProfileView = ({
  route,
  allPosts,
  navigation,
  authenticated,
  fetchFollower,
}) => {
  const { item } = route.params;
  const userPosts = allPosts.filter((post) => post.user === item.user);
  const [followingState, setFollowingState] = useState(false);
  useEffect(() => {
    projectFirestore
      .collection("following")
      .doc(authenticated.currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        if (following.length > 0) fetchFollower(following);
        if (following.includes(item.user)) setFollowingState(true);
        else setFollowingState(false);
      });
  }, []);

  const onFollow = () => {
    projectFirestore
      .collection("following")
      .doc(authenticated.currentUser.uid)
      .collection("userFollowing")
      .doc(item.user)
      .set({});
  };
  const onUnfollow = () => {
    projectFirestore
      .collection("following")
      .doc(authenticated.currentUser.uid)
      .collection("userFollowing")
      .doc(item.user)
      .delete();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {
          <CustomBar
            text={`${item.userInfo.firstName} ${item.userInfo.lastName}`}
            textColor="black"
            userIconHeight={70}
            userIconWidth={70}
            bgColor="white"
            height={2}
            iconBgColor="darkgray"
            image={
              item.userInfo.imageuri ? (
                <Image
                  source={{ uri: item.userInfo.imageuri }}
                  style={{ width: 65, height: 65, borderRadius: 35 }}
                />
              ) : (
                <AntDesign name="user" size={30} color="white" />
              )
            }
            icon={
              followingState ? (
                <SimpleLineIcons name="user-unfollow" size={18} color="white" />
              ) : (
                <SimpleLineIcons name="user-follow" size={18} color="white" />
              )
            }
            iconHeight={40}
            iconWidth={40}
            generalIconBgColor={followingState ? "tomato" : "lightgreen"}
            isAuth={authenticated.isSignedIn}
            onclick={() => (followingState ? onUnfollow() : onFollow())}
          />
        }
      </View>
      <View style={styles.postsContainer}>
        <View style={styles.postsInnerContainer}>
          <UserPosts posts={userPosts} navigation={navigation} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5A595B",
  },
  profileContainer: {
    flex: 1,
  },
  postsContainer: {
    flex: 6,
  },
  postsInnerContainer: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    allPosts: state.pts.posts,
    authenticated: state.auth,
    followers: state.auth.following,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFollower: (followers) =>
      dispatch({
        type: actionTypes.FOLLOWING_USER,
        payload: followers,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
