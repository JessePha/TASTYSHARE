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
} from "../handleLikesAndFollows/handleComments";
import Animated from "react-native-reanimated";
import BottomSheet from "../components/BottomSheet/BottomSheet";
import CommentBottomSheet from "../components/BottomSheet/CommentBottomSheet";
import FoodBottomSheet from "../components/BottomSheet/FoodBottomSheet";
import EditCommentSheet from "../components/BottomSheet/EditCommentSheet";
import { connect } from "react-redux";
import PostImage from "../components/UI/PostImage";
import { getLikes } from "../handleLikesAndFollows/handleLikes";
import { useTheme } from "@react-navigation/native";

const FoodView = ({ route, navigation, authenticated }) => {
  const bs = createRef();
  const fall = new Animated.Value(1);

  const bs1 = createRef();
  const fall1 = new Animated.Value(1);

  const bs2 = createRef();
  const fall2 = new Animated.Value(1);

  const { colors } = useTheme();

  const { item } = route.params;
  const [like, setLike] = useState(false);
  const [editComment, setEditComment] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
      if (authenticated.currentUser) {
        getLikes(
          authenticated.currentUser.uid,
          item.user,
          item.postID,
          setLike
        );
      }
    
  }, [like]);
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
            setLike={() => setLike()}
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
          />
          <EditCommentSheet bs={bs2} fall={fall2} editComment={editComment} />
          {showMessage ? (
            <View style={{ backgroundColor: "black", width: 200, height: 500 }}>
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
  };
};

export default connect(mapStateToProps, null)(FoodView);
