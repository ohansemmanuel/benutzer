const URL = "https://user-profile-json-j7n0j4c8ican.runkit.sh/";
export const fetchUserProfile = async (id) =>
  await fetch(`${URL}${id}`).then((res) => res.json());
