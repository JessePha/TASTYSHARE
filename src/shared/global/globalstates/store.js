import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import postReducer from "./reducers/postReducer";
import authReducer from "./reducers/authReducer";

const store = createStore(
  combineReducers({
    pts: postReducer,
    auth: authReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
