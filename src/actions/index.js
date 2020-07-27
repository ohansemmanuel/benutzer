import { SET_USER_PROFILE, SET_LOADING_DATA } from "./types";

const URL = "https://user-profile-json-j7n0j4c8ican.runkit.sh/";

export function fetchUserProfile(userId = "") {
  return (dispatch, getState) => {
    dispatch(setLoadingData(true));
    fetch(`${URL}${userId}`)
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

function setLoadingData(val) {
  return {
    type: SET_LOADING_DATA,
    payload: val,
  };
}
