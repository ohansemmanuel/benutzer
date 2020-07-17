import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "./actions";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const {
    name = ". . .",
    description = " . . .",
    likes = " . . .",
    location = " . . .",
    profilePic,
    isLoading = true,
  } = useSelector((v) => v);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className={`${!isLoading ? "App" : "App App--loading"}`}>
      <div className="App__header">BENUTZER</div>
      <section className="User__img">
        {profilePic && <img src={profilePic} alt="user" />}
      </section>

      {!isLoading && (
        <section className="User__info">
          <p>
            {" "}
            <span className="faint">I am</span> a {description}
          </p>
          <p>
            {" "}
            <span className="faint">I like</span> {likes}
          </p>
          <p className="User__info__details User__info__divider faint">
            <span>Name: </span>
            <span>{name}</span>
          </p>
          <p className="User__info__details faint">
            <span>Location: </span>
            <span>{location}</span>
          </p>
        </section>
      )}
    </div>
  );
};

export default App;
