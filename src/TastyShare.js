import React, { useEffect } from "react";
import HomeScreen from "./routes/tabNavigation/HomeScreen";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import * as actionType from "./shared/global/globalstates/actions/actionTypes";
import { auth } from "../config/config";
import { connect } from "react-redux";
import LoadingScreen from "./view/LoadingView";
import { NavigationContainer } from "@react-navigation/native";
import { projectFirestore } from "../config/config";
import SplashScreen from "./view/SplashView";
const TastyShare = ({ authenticate, signIn, signOut }) => {
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

  if (authenticate.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <HomeScreen auth={authenticate.isSignedIn} />
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: actionType.SIGN_IN, payload: user }),
    signOut: () => dispatch({ type: actionType.SIGN_OUT }),
  };
};

const ConnectedApp = connectActionSheet(TastyShare);

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);
