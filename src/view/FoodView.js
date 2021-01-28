import React, { useState, createRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { handleOnLike } from "../handleLikesAndFollows/handleLikes";
import {
  handleOnComment,
  onDeleteComment,
} from "../handleLikesAndFollows/handleComments";
import Animated from "react-native-reanimated";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import CommentBottomSheet from "../components/BottomSheet/CommentBottomSheet";
import FoodBottomSheet from "../components/BottomSheet/FoodBottomSheet";
import { connect } from "react-redux";
import PostImage from "../components/UI/PostImage";
import { projectFirestore } from "../../config/config";

const FoodView = ({ route, navigation, authenticated }) => {
  const bs = createRef();
  const fall = new Animated.Value(1);

  const bs1 = createRef();
  const fall1 = new Animated.Value(1);

  const { item } = route.params;
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

  return (
    <View style={{ flex: 1 }}>
      <PostImage img={item.imageuri} />
      <FoodBottomSheet
        navigation={navigation}
        height={Dimensions.get("window").height}
        item={item}
        bs={bs}
        bs1={bs1}
        authenticated={authenticated}
        handleOnLike={handleOnLike}
        like={like}
        setLike={setLike}
      />
      <BottomSheet bs={bs} fall={fall} navigation={navigation} />
      <CommentBottomSheet
        authenticated={authenticated}
        navigation={navigation}
        post={item}
        bs={bs1}
        fall={fall1}
        contentType={authenticated.isSignedIn ? "comment" : "notLogin"}
        handleOnComment={handleOnComment}
        onDeleteComment={onDeleteComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth,
    likes: state.auth.likes,
  };
};

export default connect(mapStateToProps, null)(FoodView);
