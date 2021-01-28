import React, { useEffect, createRef, useState, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Drawer } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Posts from "../components/Posts/Posts";
import { projectFirestore } from "../../config/config";
import { connect } from "react-redux";
import * as actionType from "../shared/global/globalstates/actions/actionTypes";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import FilterBottomSheet from "../components/BottomSheet/FilterBottomSheet";
import Animated from "react-native-reanimated";

const MainView = ({ navigation, getAllPosts, posts, likes, authenticated }) => {
  const bs = createRef();
  const fall = new Animated.Value(1);
  const bs1 = createRef();
  const fall1 = new Animated.Value(1);
  const [refreshing, setRefreshing] = useState(false);
  const data = posts.slice();
  const [filteredData, setFilteredData] = useState(data);
  const { colors } = useTheme();

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
          posts={filteredData.length > 0 ? filteredData : posts}
          bs={bs}
          onRefresh={onRefresh}
          refreshing={refreshing}
          authenticated={authenticated}
          likes={likes}
        />
      </View>
      <FilterBottomSheet
        bs={bs1}
        fall={fall1}
        posts={posts && posts}
        setFilteredData={setFilteredData}
      />
      <BottomSheet bs={bs} fall={fall} navigation={navigation} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
