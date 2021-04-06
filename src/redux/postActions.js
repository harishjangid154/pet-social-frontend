import { SET_POSTS } from "./types";

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_POSTS:
      state = {
        ...state,
        posts: action.payload,
      };
      break;
    default:
      state = {
        ...state,
      };
      break;
  }
  return state;
};
