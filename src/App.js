import React, { useState } from "react";
import {
  atom,
  useSetRecoilState,
  selector,
  selectorFamily,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import User, { UserPhoto } from "./User";
import "./App.css";

const URL = "https://user-profile-json-j7n0j4c8ican.runkit.sh/";
const fetchUserProfile = async (id) => {
  return await fetch(`${URL}${id}`).then((res) => res.json());
};

const userIDState = atom({
  key: "currentUserId",
  default: "",
});

// const userProfileState = selector({
//   key: "userProfile",
//   get: async ({ get }) => {
//     const id = get(userIDState);
//     return await fetchUserProfile(id);
//   },
// });

const userProfileStateQuery = selectorFamily({
  key: "userProfile",
  get: (id) => async ({ get }) => {
    return await fetchUserProfile(id);
  },
});

const splitListInHalf = (list) => {
  if (!list.length) return [[], []];

  const half = Math.ceil(list.length / 2);
  const firstHalf = list.slice(0, half);
  const secondHalf = list.slice(-half);

  return [firstHalf, secondHalf];
};

const App = () => {
  // const setCurrentUserId = useSetRecoilState(userIDState);
  const [currentUserId, setCurrentUserId] = useState("");
  // const userProfile = useRecoilValue(userProfileState(currentUserId));
  const userProfileLoadable = useRecoilValueLoadable(
    userProfileStateQuery(currentUserId)
  );
  const {
    state: userProfileState,
    contents: userProfile,
  } = userProfileLoadable;

  const isLoading = userProfileState === "loading";
  const { name, bio, likes, location, profilePic, friends = [] } = userProfile;
  const [firstHalf, secondHalf] = splitListInHalf(friends);

  const handleUserClick = (evt) => {
    setCurrentUserId(evt.currentTarget.dataset.id);
  };

  const renderFriends = (friends) => {
    if (isLoading) return null;

    return friends.map((friendId) => (
      <UserPhoto
        profilePic={`https://i.imgur.com/${friendId}`}
        onClick={handleUserClick}
        userId={friendId}
        key={friendId}
      />
    ));
  };
  return (
    <div className="App">
      {renderFriends(firstHalf)}
      <User
        name={name}
        profilePic={profilePic}
        bio={bio}
        likes={likes}
        location={location}
        isLoading={isLoading}
      />
      {renderFriends(secondHalf)}
    </div>
  );
};

export default App;
