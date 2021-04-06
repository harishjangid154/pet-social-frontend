import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import userActions from "./userActions";
import postActions from "./postActions";
const reducers = combineReducers({ userActions, postActions });
const store = createStore(
  reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
