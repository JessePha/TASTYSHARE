import React, { useEffect, createRef, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Posts from "../components/Posts/Posts";
import { connect } from "react-redux";
import * as actionTypes from "../shared/global/globalstates/actions/actionTypes";
import FilterBottomSheet from "../components/BottomSheet/FilterBottomSheet";
import { getPosts } from "../handleLikesFollowsCommentsPosts/handlePost";
import Animated from "react-native-reanimated";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import { projectFirestore } from "../../config/config";
import { fetchFollowers } from "../handleLikesFollowsCommentsPosts/handleFollow";
import { search } from "../handleSearch/handleSearch";
import { getSavedPosts } from "../handleLikesFollowsCommentsPosts/handleSave";

const MainScreen = ({
  navigation,
  getAllPosts,
  posts,
  likes,
  authenticated,
  getUsers,
  users,
  getFollowers,
  fetchSavedPosts,
}) => {
  const bs = createRef();
  const fall = new Animated.Value(1);
  const bs1 = createRef();
  const fall1 = new Animated.Value(1);
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useTheme();
  const clearText = createRef();

  useEffect(() => {
    if (users.length > 0) {
      getPosts(users, getAllPosts, setRefreshing);
      fetchFollowers(users, getFollowers);
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

  const onSearch = (input) => {
    if (input !== "" && input !== undefined) {
      const searchData = search(posts, input);
      navigation.navigate("search", {
        data: searchData,
        authenticated: authenticated.currentUser,
      });
    } else {
      navigation.navigate("search", {
        data: [],
        authenticated: authenticated.currentUser,
      });
    }
    clearText.current.clear();
  };
  useEffect(() => {
    if (authenticated.currentUser) {
      getSavedPosts(authenticated.currentUser.uid, fetchSavedPosts);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <View style={{ flex: 1, paddingRight: 5 }}>
            <TouchableOpacity>
              <TextInput
                placeholder="search"
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: 5,
                  borderRadius: 5,
                  height: 35,
                }}
                onSubmitEditing={(input) => onSearch(input.nativeEvent.text)}
                ref={clearText}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => bs1.current.snapTo(0)}>
              <MaterialCommunityIcons
                name="filter-variant"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
        {posts.length > 0 ? (
          <View style={{ flex: 10 }}>
            <Posts
              navigation={navigation}
              posts={posts}
              onRefresh={onRefresh}
              refreshing={refreshing}
              authenticated={authenticated}
              likes={likes}
            />
          </View>
        ) : (
          <View
            style={{ flex: 10, justifyContent: "center", alignItems: "center" }}
          >
            <AntDesign name="addfile" size={50} color={colors.text} />
            <Text style={{ color: colors.text, fontSize: 15, padding: 20 }}>
              No post
            </Text>
          </View>
        )}
        <FilterBottomSheet bs={bs1} fall={fall1} posts={posts && posts} />
        <BottomSheet bs={bs} fall={fall} navigation={navigation} />
      </View>
    </TouchableWithoutFeedback>
  );
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
      dispatch({ type: actionTypes.GET_ALL_POSTS, payload: posts });
    },
    getFollowers: (followers) =>
      dispatch({ type: actionTypes.GET_FOLLOWERS, payload: followers }),
    getUsers: (users) =>
      dispatch({ type: actionTypes.GET_USERS, payload: users }),
    fetchSavedPosts: (savedPosts) =>
      dispatch({ type: actionTypes.GET_SAVED_POST, payload: savedPosts }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
