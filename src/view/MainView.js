import React, { useEffect, createRef, useState, useCallback } from "react";
import { View } from "react-native";
import Posts from "../components/Posts/Posts";
import { projectFirestore } from "../../config/config";
import { connect } from "react-redux";
import * as actionType from "../shared/global/globalstates/actions/actionTypes";
import Modal from "../components/BottomSheet/BottomSheet";
import Animated from "react-native-reanimated";

const MainView = ({
  navigation,
  getAllPosts,
  getAllLikes,
  posts,
  likes,
  authenticated,
}) => {
  const bs = createRef();
  const fall = new Animated.Value(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = async () => {
      const querySnapshot = await projectFirestore.collection("users").get();
      const data = [];
      let getData = null;
      querySnapshot.forEach((user) => {
        getData = new Promise((resolve) => {
          projectFirestore
            .collection("posts")
            .doc(user.id)
            .collection("userPosts")
            .get()
            .then((posts) =>
              posts.forEach((post) => {
                resolve(
                  data.push({
                    ...post.data(),
                    postID: post.id,
                    userInfo: user.data(),
                  })
                );
              })
            );
        });
      });
      getData.then(() => {
        setRefreshing(false);
        getAllPosts(data);
      });
    };
    unsubscribe();
    return unsubscribe;
  }, [refreshing]);

  useEffect(() => {
    let likes = [];
    posts.forEach((post) => {
      projectFirestore
        .collection("posts")
        .doc(post.user)
        .collection("userPosts")
        .doc(post.postID)
        .collection("likes")
        .doc(authenticated.currentUser.uid)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            likes.push(post.postID);
            getAllLikes(likes);
          } else {
            likes = likes.filter((like) => like !== post.postID);
            getAllLikes(likes);
          }
        });
    });
  }, [posts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, [refreshing]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 8, backgroundColor: "#5A595B" }}>
        {posts && (
          <Posts
            navigation={navigation}
            posts={posts}
            bs={bs}
            onRefresh={onRefresh}
            refreshing={refreshing}
            authenticated={authenticated}
            likes={likes}
          />
        )}
      </View>
      <Modal bs={bs} fall={fall} navigation={navigation} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.pts.posts,
    authenticated: state.auth,
    likes: state.auth.likes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPosts: (posts) => {
      dispatch({ type: actionType.GET_ALL_POSTS, payload: posts });
    },
    getAllLikes: (likes) => {
      dispatch({ type: actionType.GET_LIKE_POST, payload: likes });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
