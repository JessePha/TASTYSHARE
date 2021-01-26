import React, { useEffect, useState } from "react";
import HomeScreen from "./routes/tabNavigation/HomeScreen";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import * as actionType from "./shared/global/globalstates/actions/actionTypes";
import { auth } from "../config/config";
import { connect } from "react-redux";
import LoadingScreen from "./view/LoadingView";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import { projectFirestore } from "../config/config";
const TastyShare = ({
  authenticated,
  signIn,
  signOut,
  isDarkTheme,
  getAllPosts,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#fff",
      text: "#556052",
      card: "#f0f0f0",
      border: "darkgray",
      iconColor: "#fff",
      iconBackgroundColor: "#b8b0b0",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#303841",
      text: "#fff",
      card: "#3a4750",
      border: "darkgray",
      iconColor: "gray",
      iconBackgroundColor: "white",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        projectFirestore
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => signIn({ ...doc.data(), uid: user.uid }));
      } else {
        signOut();
      }
    });
  }, []);

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

  if (authenticated.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <HomeScreen auth={authenticated.isSignedIn} />
      </NavigationContainer>
    </PaperProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth,
    isDarkTheme: state.auth.theme,
    posts: state.pts.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: actionType.SIGN_IN, payload: user }),
    signOut: () => dispatch({ type: actionType.SIGN_OUT }),
    changeTheme: () => dispatch({ type: actionType.CHANGE_THEME, payload }),
    getAllPosts: (posts) => {
      dispatch({ type: actionType.GET_ALL_POSTS, payload: posts });
    },
  };
};

const ConnectedApp = connectActionSheet(TastyShare);

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
