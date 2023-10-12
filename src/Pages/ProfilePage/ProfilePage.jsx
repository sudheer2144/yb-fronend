import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const getLoggedInUser = useSelector((state) => state.user.user);
  return (
    <div className="container">
      <div className="inputContainer signup-login-page">
        <h2>{getLoggedInUser.name}</h2>
        <h3>{getLoggedInUser.email}</h3>
      </div>
    </div>
  );
};

export default ProfilePage;
