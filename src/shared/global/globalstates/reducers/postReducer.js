import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utilities";

const initialState = {
  posts: [],
  error: null,
  loading: true,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_POSTS:
      const posts = action.payload.slice();
      return updateObject(state, {
        ...state,
        posts: posts,
      });
    case actionType.ADD_POST:
      return { ...state, posts: [...action.payload, action.post] };
    default:
      return { state };
  }
};

export default postReducer;
