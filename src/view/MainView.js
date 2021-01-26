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
      let getData = [];
      querySnapshot.forEach((user) => {
        getData.push(
          new Promise((resolve) => {
            projectFirestore
              .collection("posts")
              .doc(user.id)
              .collection("userPosts")
              .get()
              .then((posts) => {
                posts.forEach((post) => {
                  data.push({
                    ...post.data(),
                    postID: post.id,
                    userInfo: user.data(),
                  });
                });
                resolve(data);
              });
          })
        );
      });
      Promise.all(getData).then(() => {
        getAllPosts(data);
        setRefreshing(false);
      });
    };
    unsubscribe();
    return () => unsubscribe();
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, [refreshing]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 8}}>
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
