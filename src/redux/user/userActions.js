import { SET_USER } from "../types";

const initState = {
  isAuthenticated: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log("before", state);
      state = {
        ...state,
        isAuthenticated: true,
        user: {
          ...action.payload,
        },
      };
      console.log("after", state);
      break;

    default:
      state = {
        ...state,
      };
  }
  return state;
};
