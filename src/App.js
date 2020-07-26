import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import User from "./User";
import "./App.css";

const URL = "https://user-profile-json-j7n0j4c8ican.runkit.sh/";
const fetchUserProfile = async (id = "") =>
  await fetch(`${URL}${id}`).then((res) => res.json());

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
    isLoading = true,
  } = userProfile;

  useEffect(() => {
    fetchUserProfile().then((data) =>
      setUserProfile({ ...data, isLoading: false })
    );
  }, [setUserProfile]);

  return (
    <div className="App">
      <User
        name={name}
        profilePic={profilePic}
        bio={bio}
        likes={likes}
        location={location}
        isLoading={isLoading}
      />
    </div>
  );
};

export default App;
