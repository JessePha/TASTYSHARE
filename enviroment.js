import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost =
  Platform.OS === "ios" ? "localhost:19002" : "192.168.0.152:19000";

const ENV = {
  dev: {
    apiUrl: localhost,
    SECRET_KEY: "AIzaSyBlcHfmNg4AXbWkHg72eX5HSCGBcSgteoQ",
    SECRET_DOMAIN: "tastyshare-d7978.firebaseapp.com",
    SECRET_ID: "tastyshare-d7978",
    SECRET_BUCKET: "tastyshare-d7978.appspot.com",
    SECRET_SENDERID: "762457080442",
    APP_API: "1:762457080442:web:6861f5d4e1205e196671c3",
  },
  staging: {
    SECRET_KEY: "AIzaSyBlcHfmNg4AXbWkHg72eX5HSCGBcSgteoQ",
    SECRET_DOMAIN: "tastyshare-d7978.firebaseapp.com",
    SECRET_ID: "tastyshare-d7978",
    SECRET_BUCKET: "tastyshare-d7978.appspot.com",
    SECRET_SENDERID: "762457080442",
    APP_API: "1:762457080442:web:6861f5d4e1205e196671c3",

    // Add other keys you want here
  },
  prod: {
    SECRET_KEY: "AIzaSyBlcHfmNg4AXbWkHg72eX5HSCGBcSgteoQ",
    SECRET_DOMAIN: "tastyshare-d7978.firebaseapp.com",
    SECRET_ID: "tastyshare-d7978",
    SECRET_BUCKET: "tastyshare-d7978.appspot.com",
    SECRET_SENDERID: "762457080442",
    APP_API: "1:762457080442:web:6861f5d4e1205e196671c3",
    // Add other keys you want here
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
