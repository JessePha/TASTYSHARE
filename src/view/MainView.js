import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Posts from "../components/Posts/Posts";
import { projectFirestore } from "../../config/config";
import { connect } from "react-redux";
import * as actionType from "../shared/global/globalstates/actions/actionTypes";
const MainView = ({ navigation, gettAllPosts }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = projectFirestore
      .collection("posts")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          projectFirestore
            .collection("users")
            .doc(doc.data().user)
            .get()
            .then((user) => {
              data.push({ ...doc.data(), userInfo: user.data() });
              if (data.length === querySnapshot.size) {
                setPosts(data);
                gettAllPosts(data);
              }
            })
            .catch((error) => console.log(error));
        });
      });
    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 8, backgroundColor: "#5A595B" }}>
        {posts.length > 0 ? (
          <Posts navigation={navigation} posts={posts} />
        ) : null}
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    gettAllPosts: (posts) => {
      dispatch({ type: actionType.GET_ALL_POSTS, payload: posts });
    },
  };
};

export default connect(null, mapDispatchToProps)(MainView);
