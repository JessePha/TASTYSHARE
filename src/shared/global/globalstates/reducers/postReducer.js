import * as actionType from "../actions/actionTypes";

const initialState = {
  posts: [],
  error: null,
  loading: true,
};

const postReducer = (state = initialState, action) => {
  switch (action.Type) {
    case actionType.GET_ALL_POSTS:
      return { ...state, posts: action.payload };
    case actionType.ADD_POST:
      return { ...state, posts: [...action.payload, action.post] };
    default:
      return { state };
  }
};

export default postReducer;
