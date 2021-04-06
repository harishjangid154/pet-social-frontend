import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import userActions from "./userActions";

const store = createStore(
  userActions,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
