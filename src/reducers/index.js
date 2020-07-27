import { SET_USER_PROFILE, SET_LOADING_DATA } from "../actions/types";

const reducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_PROFILE:
      return {
        ...payload,
        isLoading: false,
      };

    case SET_LOADING_DATA:
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
};

export default reducer;
