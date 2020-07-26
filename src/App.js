import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import User from "./User";
import "./App.css";

const URL = "https://user-profile-json-j7n0j4c8ican.runkit.sh/";
const fetchUserProfile = async () => await fetch(URL).then((res) => res.json());

const userProfileState = atom({
  key: "userProfile",
  default: {},
});

const App = () => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const {
    name,
    bio,
    likes,
    location,
    profilePic,
    friends = [],
    isLoading = true,
  } = userProfile;

  useEffect(() => {
    console.log("fetching on mount");
    fetchUserProfile().then((data) =>
      setUserProfile({ ...data, isLoading: false })
    );
  }, [setUserProfile]);

  const half = Math.ceil(friends.length / 2);
  const firstHalf = friends.slice(0, half);
  const secondHalf = friends.slice(-half);

  return (
    <div className="App">
      {!!friends.length &&
        firstHalf.map((friendId) => (
          <User
            name={name}
            profilePic={`https://i.imgur.com/${friendId}`}
            bio={bio}
            likes={likes}
            location={location}
            isLoading={isLoading}
            mini
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
          <User
            name={name}
            profilePic={`https://i.imgur.com/${friendId}`}
            bio={bio}
            likes={likes}
            location={location}
            isLoading={isLoading}
            mini
          />
        ))}
    </div>
  );
};

export default App;
