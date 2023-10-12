import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../CustomButton/LoadingButton";
import { clearUser } from "../../redux/slices/userSlice";
import { BsLightbulb } from "react-icons/bs";
import { BsLightbulbOff } from "react-icons/bs";
import icon from "./icon.png";
import { toast } from "react-toastify";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header = () => {
  const getLoggedInUser = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dark, setDark] = useState(
    localStorage.getItem("ybTheme") == "light" ? false : true
  );

  function logoutHandleClick() {
    setIsLoading(true);
    dispatch(clearUser());
    setIsLoading(false);
    navigate("/");
    toast.success("Logout Successfull.");
  }

  useEffect(() => {
    if (dark) {
      setDark(true);
      localStorage.setItem("ybTheme", "dark");
      document.documentElement.setAttribute("data-theme", "");
    } else {
      setDark(false);
      localStorage.setItem("ybTheme", "light");
      document.documentElement.setAttribute("data-theme", "dark-off");
    }
  }, [dark]);

  return (
    <div className="header-main-container">
      <div
        className="icon-section"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="image-icon">
          <img src={icon} alt="icon" className="icon" />
        </div>
        <h1 className="first-title">
          Yeah<span className="sec-title">Blogs</span>
        </h1>
      </div>
      <div className="links-section">
        <p
          className="mode-icon-section"
          onClick={() => {
            setDark(!dark);
          }}
        >
          {dark ? (
            <BsLightbulb className="mode-icon" />
          ) : (
            <BsLightbulbOff className="mode-icon" />
          )}
        </p>
        <NavLink to={"/"}>Home</NavLink>
        {getLoggedInUser && (
          <>
            <NavLink to={"/create-blog"}>Create Blog</NavLink>
            <NavLink to={"/profile"}>Profile</NavLink>
            <LoadingButton
              loading={isLoading}
              onClcik={logoutHandleClick}
              text="Logout"
            />
          </>
        )}
        {!getLoggedInUser && (
          <>
            <NavLink to={"/login"}>Login/SignUp</NavLink>
          </>
        )}
      </div>
      <div className="mobile-drawer">
        <p
          className="mode-icon-section"
          onClick={() => {
            setDark(!dark);
          }}
        >
          {dark ? (
            <BsLightbulb className="mode-icon" />
          ) : (
            <BsLightbulbOff className="mode-icon" />
          )}
        </p>
        <BurgerMenu
          isLoading={isLoading}
          logoutHandleClick={logoutHandleClick}
        />
      </div>
    </div>
  );
};

export default Header;
