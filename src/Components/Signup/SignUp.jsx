import React, { useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../CustomButton/LoadingButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import InputComponent from "../InputComponent/InputComponent";
import axios from "axios";
import { setUser } from "../../redux/slices/userSlice";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [cnfUserPassword, setCnfUserPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    if (
      userPassword === cnfUserPassword &&
      userPassword.length >= 8 &&
      userEmail &&
      userName
    ) {
      try {
        setIsLoading(true);
        const res = await axios.post(
          "https://yb-backend.vercel.app/api/user/signup",
          {
            name: userName,
            email: userEmail,
            password: userPassword,
          }
        );
        dispatch(setUser(res.data));
        toast.success(`Signup Success.`);
        setIsLoading(false);
        navigate("/");
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
      }
    } else {
      if (userPassword !== cnfUserPassword) {
        toast.warn("Password Mismatch.");
      } else {
        toast.info("Enter valid values !");
      }
      setIsLoading(false);
    }
  }

  return (
    <>
      <h2>SignUp</h2>
      <InputComponent
        type={"text"}
        value={userName}
        setState={setUserName}
        placeholder={"Full Name"}
      />
      <InputComponent
        type={"email"}
        value={userEmail}
        setState={setUserEmail}
        placeholder={"Email"}
      />
      <InputComponent
        type={"password"}
        value={userPassword}
        setState={setUserPassword}
        placeholder={"Password"}
      />
      <InputComponent
        type={"password"}
        value={cnfUserPassword}
        setState={setCnfUserPassword}
        placeholder={"Confirm Password"}
      />
      {
        <LoadingButton
          onClcik={handleClick}
          loading={isLoading}
          text={"SignUp"}
        />
      }
    </>
  );
};

export default SignUp;
