import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import userActions from "./user/userActions";
import ReduxThunk from "redux-thunk";
import postActions from "./post/postActions";

// combining all reducers
const store = createStore(
  combineReducers({ userActions, postActions }),
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
