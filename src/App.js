import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "./actions";
import User from "./User";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const {
    name = ". . .",
    bio,
    likes = " . . .",
    location = " . . .",
    profilePic,
    isLoading = true,
  } = useSelector((v) => v);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className={"App"}>
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
