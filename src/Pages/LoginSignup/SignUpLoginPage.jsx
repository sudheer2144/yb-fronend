import React, { useState } from "react";
import "./SignUpLoginPage.css";
import Login from "../../Components/Login/Login";
import SignUp from "../../Components/Signup/SignUp";

const LoginSignUp = () => {
  const [switchLogin, setSwitchLogin] = useState(true);

  const switchText = switchLogin
    ? "Don't have an Account ?"
    : "Already have an Account ?";

  return (
    <div className="container">
      <div className="inputContainer signup-login-page">
        {switchLogin && <Login />}
        {!switchLogin && <SignUp />}
        <p
          className="switchLink"
          onClick={() => {
            setSwitchLogin(!switchLogin);
          }}
        >
          {switchText}
        </p>
      </div>
    </div>
  );
};

export default LoginSignUp;
