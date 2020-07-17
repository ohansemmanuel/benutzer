import { SET_USER_PROFILE } from "../actions/types";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
