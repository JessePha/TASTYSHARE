import React, { useState, createRef, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  handleOnComment,
  onDeleteComment,
} from "../handleLikesFollowsCommentsPosts/handleComments";
import Animated from "react-native-reanimated";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import CommentBottomSheet from "../components/BottomSheet/CommentBottomSheet";
import FoodBottomSheet from "../components/BottomSheet/FoodBottomSheet";
import EditCommentSheet from "../components/BottomSheet/EditCommentSheet";
import { connect } from "react-redux";
import PostImage from "../components/UI/PostImage";
import { getLikes } from "../handleLikesFollowsCommentsPosts/handleLikes";

const FoodScreen = ({
  route,
  navigation,
  authenticated,
  savedPosts,
}) => {
  const bs = createRef();
  const fall = new Animated.Value(1);

  const bs1 = createRef();
  const fall1 = new Animated.Value(1);

  const bs2 = createRef();
  const fall2 = new Animated.Value(1);

  const { item } = route.params;
  const [like, setLike] = useState(false);
  const [editComment, setEditComment] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (authenticated.currentUser) {
      getLikes(authenticated.currentUser.uid, item.user, item.postID, setLike);
    }
  }, [like]);

  const alertMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 900);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <PostImage img={item.imageuri} />
          <FoodBottomSheet
            navigation={navigation}
            height={Dimensions.get("screen").height}
            item={item}
            bs={bs}
            bs1={bs1}
            authenticated={authenticated}
            like={like}
            setLike={setLike}
            alertMessage={alertMessage}
            savedPosts = {savedPosts}
          />
          <BottomSheet bs={bs} fall={fall} navigation={navigation} />
          <CommentBottomSheet
            authenticated={authenticated}
            navigation={navigation}
            post={item}
            bs={bs1}
            fall={fall1}
            bs2={bs2}
            contentType={authenticated.isSignedIn ? "comment" : "notLogin"}
            handleOnComment={handleOnComment}
            onDeleteComment={onDeleteComment}
            setEditComment={setEditComment}
            alertMessage={alertMessage}
          />
          <EditCommentSheet
            bs={bs2}
            fall={fall2}
            editComment={editComment}
            alertMessage={alertMessage}
          />
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    savedPosts: state.auth.savedPosts,
  };
};

export default connect(mapStateToProps, null)(FoodScreen);
