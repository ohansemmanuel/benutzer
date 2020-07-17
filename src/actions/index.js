import { SET_USER_PROFILE } from "./types";

const URL = "https://untitled-j7n0j4c8ican.runkit.sh/";

export function fetchUserProfile() {
  return (dispatch, getState) => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => dispatch(setUserProfile(data)));
  };
}

function setUserProfile(data) {
  return {
    type: SET_USER_PROFILE,
    payload: data,
  };
}
