import React, { createRef, useState } from "react";
import UserPost from "./post/UserPost";
import {
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Animated from "react-native-reanimated";
import EditPostBottomSheet from "../BottomSheet/EditPostBottomSheet";
import {
  updatePost,
  onDelete,
} from "../../handleLikesFollowsCommentsPosts/handlePost";

const UserPosts = ({ posts, navigation, alertMessage }) => {
  const bs = createRef();
  const clearText = createRef();
  const clearText1 = createRef();
  const clearText2 = createRef();
  const clearText3 = createRef();
  const clearText4 = createRef();
  const fall = new Animated.Value(1);
  const [postInfo, setPostInfo] = useState({});

  const resetForm = () => {
    clearText.current.clear();
    clearText1.current.clear();
    clearText2.current.clear();
    clearText3.current.clear();
    clearText4.current.clear();
  };

  const onEdit = (post) => {
    bs.current.snapTo(0);
    setPostInfo(post);
  };
  const edit = (uPost) => {
    let updateData = { ...postInfo };
    if (
      uPost.title === "" &&
      uPost.price === "" &&
      uPost.description === "" &&
      uPost.category === "" &&
      uPost.imageuri === null &&
      uPost.location === ""
    ) {
      bs.current.snapTo(1);
    } else if (
      uPost.title !== "" &&
      uPost.price !== "" &&
      uPost.description !== "" &&
      uPost.category !== "" &&
      uPost.imageuri !== null &&
      uPost.location !== ""
    )
      updateData = { ...uPost };

    if (uPost.title !== "") {
      updateData = { ...updateData, title: uPost.title };
    }
    if (uPost.price !== "") updateData = { ...updateData, price: uPost.price };
    if (uPost.location !== "")
      updateData = { ...updateData, location: uPost.location };
    if (uPost.description !== "")
      updateData = { ...updateData, description: uPost.description };
    if (uPost.category !== "")
      updateData = { ...updateData, category: uPost.category };
    if (uPost.imageuri !== null)
      updateData = { ...updateData, imageuri: uPost.imageuri };

    updatePost(updateData, alertMessage);
    resetForm();
    bs.current.snapTo(1);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.postID}
          renderItem={({ item }) => (
            <UserPost
              item={item}
              navigation={navigation}
              onDelete={onDelete}
              onEdit={onEdit}
              alertMessage={alertMessage}
            />
          )}
        />
        <EditPostBottomSheet
          bs={bs}
          fall={fall}
          navigation={navigation}
          postInfo={postInfo}
          edit={edit}
          resetForm={resetForm}
          clearText={clearText}
          clearText1={clearText1}
          clearText2={clearText2}
          clearText3={clearText3}
          clearText4={clearText4}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserPosts;
