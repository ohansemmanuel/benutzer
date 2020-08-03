import React from "react";
import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import User, { UserPhoto } from "./User";
import { fetchUserProfile } from "./api";
import "./App.css";

const userIDState = atom({
  key: "currentUserId",
  default: "",
});

const userProfileState = selector({
  key: "userProfile",
  get: async ({ get }) => {
    const id = get(userIDState);
    return await fetchUserProfile(id);
  },
});

const App = () => {
  const setCurrentUserId = useSetRecoilState(userIDState);
  const userProfile = useRecoilValue(userProfileState);

  const {
    name,
    bio,
    likes,
    location,
    profilePic,
    friends = [],
    isLoading = false,
  } = userProfile;

  const half = Math.ceil(friends.length / 2);
  const firstHalf = friends.slice(0, half);
  const secondHalf = friends.slice(-half);

  const handleUserClick = (evt) => {
    setCurrentUserId(evt.currentTarget.dataset.id);
  };

  return (
    <div className="App">
      {!!friends.length &&
        firstHalf.map((friendId) => (
          <UserPhoto
            profilePic={`https://i.imgur.com/${friendId}`}
            onClick={handleUserClick}
            userId={friendId}
            key={friendId}
          />
        ))}
      <User
        name={name}
        profilePic={profilePic}
        bio={bio}
        likes={likes}
        location={location}
        isLoading={isLoading}
      />
      {!!friends.length &&
        secondHalf.map((friendId) => (
          <UserPhoto
            profilePic={`https://i.imgur.com/${friendId}`}
            onClick={handleUserClick}
            userId={friendId}
            key={friendId}
          />
        ))}
    </div>
  );
};

export default App;
