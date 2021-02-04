import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utilities";

const initialState = {
  isLoading: true,
  isSignedIn: false,
  currentUser: null,
  following: [],
  likes: [],
  comments: [],
  theme: false,
  refresh: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return updateObject(state, {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        isLoading: false,
      });

    case actionTypes.SIGN_OUT:
      return updateObject(state, {
        ...state,
        isSignedIn: false,
        currentUser: null,
        isLoading: false,
        following: [],
        likes: [],
      });
    case actionTypes.FOLLOWING_USER:
      return updateObject(state, {
        ...state,
        following: action.payload,
      });
    case actionTypes.GET_LIKE_POST:
      const likes = action.payload.slice();
      return updateObject(state, {
        ...state,
        likes: likes,
      });
    case actionTypes.GET_COMMENTS:
      const comments = action.payload.slice();
      return updateObject(state, {
        ...state,
        comments: comments,
      });
    case actionTypes.CHANGE_THEME:
      return updateObject(state, {
        ...state,
        theme: action.payload,
      });
    case actionTypes.ON_REFRESH:
      return updateObject(state, {
        ...state,
        refresh: action.payload,
      });
    default:
      return state;
  }
};

export default auth;
