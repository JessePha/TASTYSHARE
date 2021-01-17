import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSignedIn: false,
  currentUser: null,
  following: [],
  likes: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        isLoading: false,
      };

    case actionTypes.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        currentUser: null,
        isLoading: false,
      };
    case actionTypes.FOLLOWING_USER:
      return {
        ...state,
        following: action.payload,
      };
    case actionTypes.GET_LIKE_POST:
      const likes = action.payload.slice();
      return {
        ...state,
        likes: likes,
      };
    default:
      return state;
  }
};

export default auth;
