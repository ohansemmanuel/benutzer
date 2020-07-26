import React from "react";

const User = ({ profilePic, bio, likes, name, location, isLoading, mini }) => {
  const showUserInfo = !isLoading && !mini;
  const cardClassNames = [
    !isLoading ? "Card" : "Card Card--loading",
    mini && "Card--mini",
  ].join(" ");

  const userImgClassNames = ["User__img", mini && "User__img--mini"].join(" ");

  return (
    <div className={cardClassNames}>
      <section className={userImgClassNames}>
        {profilePic && <img src={profilePic} alt="user" />}
      </section>
      {showUserInfo && (
        <section className="User__info">
          <p>
            <span role="img" aria-label="owl">
              🦉
            </span>{" "}
            {bio}
          </p>
          <p>
            <span role="img" aria-label="green">
              🌴{" "}
            </span>{" "}
            {likes}
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

export default User;
