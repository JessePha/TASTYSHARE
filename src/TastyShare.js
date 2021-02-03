import React, { useEffect } from "react";
import HomeScreen from "./routes/HomeScreen";
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
}) => {
  
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
    const unsubscribe = () => {
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
    };
    unsubscribe();
    return () => unsubscribe();
  }, []);

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
    users: state.pts.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: actionType.SIGN_IN, payload: user }),
    signOut: () => dispatch({ type: actionType.SIGN_OUT }),
    changeTheme: () => dispatch({ type: actionType.CHANGE_THEME, payload }),
  };
};

const ConnectedApp = connectActionSheet(TastyShare);

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
