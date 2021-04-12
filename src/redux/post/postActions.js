import { SET_POSTS, SET_SINGEL_POST } from "../types";

const initState = {
  posts: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_POSTS:
      state = {
        ...state,
        posts: action.payload,
      };
      break;
    case SET_SINGEL_POST:
      state.posts.push(action.payload);
      break;
    default:
      state = {
        ...state,
      };
      break;
  }
  return state;
};
