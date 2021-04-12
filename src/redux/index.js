import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import userActions from "./user/userActions";
import ReduxThunk from "redux-thunk";
import postActions from "./post/postActions";
import notification from "./notification";

// combining all reducers
const rootReducer = combineReducers({ userActions, postActions, notification });
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
