import React, { useEffect, createRef, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Drawer } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Posts from "../components/Posts/Posts";
import { connect } from "react-redux";
import * as actionType from "../shared/global/globalstates/actions/actionTypes";
import FilterBottomSheet from "../components/BottomSheet/FilterBottomSheet";
import { getPosts } from "../handleLikesFollowsCommentsPosts/handlePost";
import Animated from "react-native-reanimated";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import { projectFirestore } from "../../config/config";
import { fetchFollowers } from "../handleLikesFollowsCommentsPosts/handleFollow";

const MainView = ({
  navigation,
  getAllPosts,
  posts,
  likes,
  authenticated,
  getUsers,
  users,
  getFollowers,
}) => {
  const bs = createRef();
  const fall = new Animated.Value(1);
  const bs1 = createRef();
  const fall1 = new Animated.Value(1);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    if (users.length > 0) {
      getPosts(users, getAllPosts, setRefreshing);
    }
  }, [refreshing, users]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, [refreshing]);

  useEffect(() => {
    projectFirestore
      .collection("users")
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { ...data, id };
        });
        getUsers(users);
      })
      .catch(() => console.log("something went wrong"));
  }, [refreshing]);

  useEffect(() => {
    if (users.length > 0) {
      fetchFollowers(users, getFollowers);
    }
  }, [users]);

  return posts.length > 0 ? (
    <View style={{ flex: 1 }}>
      <Drawer.Section>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <TouchableOpacity onPress={() => bs1.current.snapTo(0)}>
            <MaterialCommunityIcons
              name="filter-variant"
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </Drawer.Section>
      <View style={{ flex: 8 }}>
        <Posts
          navigation={navigation}
          posts={posts}
          onRefresh={onRefresh}
          refreshing={refreshing}
          authenticated={authenticated}
          likes={likes}
        />
      </View>
      <FilterBottomSheet bs={bs1} fall={fall1} posts={posts && posts} />
      <BottomSheet bs={bs} fall={fall} navigation={navigation} />
    </View>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    posts: state.pts.posts,
    authenticated: state.auth,
    users: state.pts.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPosts: (posts) => {
      dispatch({ type: actionType.GET_ALL_POSTS, payload: posts });
    },
    getFollowers: (followers) =>
      dispatch({ type: actionType.GET_FOLLOWERS, payload: followers }),
    getUsers: (users) =>
      dispatch({ type: actionType.GET_USERS, payload: users }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
