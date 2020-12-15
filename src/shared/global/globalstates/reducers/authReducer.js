import * as actionType from "../actions/actionTypes";

const initialState = {
  isLoading: true,
  isSignedIn: false,
  currentUser: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        isLoading: false,
      };

    case actionType.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        currentUser: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default auth;
