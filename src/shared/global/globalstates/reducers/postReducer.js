import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utilities";

const initialState = {
  posts: [],
  users: [],
  followers: {},
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
    case actionType.DELETE_POST:
      const filteredPost = state.posts.filter(
        (p) => p.postID !== action.payload
      );
      return updateObject(state, { ...state, posts: filteredPost });
    case actionType.GET_USERS:
      const users = action.payload.slice();
      return updateObject(state, { ...state, users: users });
    case actionType.GET_FOLLOWERS:
      const followers = { ...action.payload };
      return updateObject(state, { ...state, followers: followers });
    default:
      return state;
  }
};

export default postReducer;
