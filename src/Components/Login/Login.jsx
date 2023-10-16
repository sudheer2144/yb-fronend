import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../CustomButton/LoadingButton";
import InputComponent from "../InputComponent/InputComponent";
import axios from "axios";
import { setUser } from "../../redux/slices/userSlice";

const Login = () => {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleClick() {
    if (userEmail && userPassword) {
      console.log(userEmail, userPassword);
      try {
        setLoading(true);
        const res = await axios.post(
          "https://yb-backend.vercel.app/api/user/login",
          {
            email: userEmail,
            password: userPassword,
          }
        );
        dispatch(setUser(res.data));
        toast.success(`Welcome ${res.data.name}.`);
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        setPassword("");
      }
    } else {
      toast.info("Enter valid values !");
      setLoading(false);
    }
  }

  return (
    <>
      <h2>Login</h2>
      <InputComponent
        type={"email"}
        value={userEmail}
        setState={setEmail}
        placeholder={"Email"}
      />
      <InputComponent
        type={"password"}
        value={userPassword}
        setState={setPassword}
        placeholder={"Password"}
      />
      {<LoadingButton onClcik={handleClick} loading={loading} text={"Login"} />}
    </>
  );
};

export default Login;
