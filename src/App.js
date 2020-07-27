import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "./actions";
import User, { UserPhoto } from "./User";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const {
    name = "",
    bio,
    likes = " ",
    location = " ",
    profilePic,
    friends = [],
    isLoading,
  } = useSelector((v) => v);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const half = Math.ceil(friends.length / 2);
  const firstHalf = friends.slice(0, half);
  const secondHalf = friends.slice(-half);

  const handleUserClick = (evt) => {
    const userId = evt.currentTarget.dataset.id;
    dispatch(fetchUserProfile(userId));
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
