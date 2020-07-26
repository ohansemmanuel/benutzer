import React from "react";
import { atom, useRecoilState, selectorFamily, useRecoilValue } from "recoil";
import User, { UserPhoto } from "./User";
import "./App.css";

const URL = "https://user-profile-json-j7n0j4c8ican.runkit.sh/";
const fetchUserProfile = async (id) =>
  await fetch(`${URL}${id}`).then((res) => res.json());

const userIDState = atom({
  key: "currentUserId",
  default: "",
});

const userProfileState = selectorFamily({
  key: "userProfile",
  get: (userId) => async ({ get }) => {
    const id = get(userIDState);
    return await fetchUserProfile(id);
  },
});

const App = () => {
  const [currentUserId, setCurrentUserId] = useRecoilState(userIDState);
  const userProfile = useRecoilValue(userProfileState(currentUserId));

  console.log({ currentUserId });
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
