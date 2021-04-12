import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from "../types";

const initState = {
  isAuthenticated: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    default:
      state = {
        ...state,
      };
  }
  return state;
};
