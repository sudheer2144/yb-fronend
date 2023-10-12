import React, { useRef, useState } from "react";
import "./styles.css";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import LoadingButton from "../CustomButton/LoadingButton";
import { useSelector } from "react-redux";

const BurgerMenu = ({ logoutHandleClick, isLoading }) => {
  const burgerMenuRef = useRef();
  const [showPaper, setShowPaper] = useState(false);
  const getLoggedInUser = useSelector((state) => state.user.user);

  function changeToCross() {
    burgerMenuRef.current.classList.toggle("change");
    setShowPaper(!showPaper);
  }

  return (
    <>
      <div className="burger-menu" ref={burgerMenuRef} onClick={changeToCross}>
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
      </div>
      <AnimatePresence>
        {showPaper && (
          <motion.div
            className="main-paper"
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ x: 200 }}
            transition={{ duration: 0.3 }}
          >
            <NavLink to={"/"}>
              <p onClick={changeToCross}>Home</p>
            </NavLink>
            {getLoggedInUser && (
              <>
                <NavLink to={"/create-blog"} onClcik={changeToCross}>
                  <p onClick={changeToCross}>Create Blog</p>
                </NavLink>
                <NavLink to={"/profile"} onClcik={changeToCross}>
                  <p onClick={changeToCross}>Profile</p>
                </NavLink>
                <LoadingButton
                  loading={isLoading}
                  onClcik={logoutHandleClick}
                  text="Logout"
                />
              </>
            )}
            {!getLoggedInUser && (
              <>
                <NavLink to={"/login"} onClcik={changeToCross}>
                  <p onClick={changeToCross}>Login/SignUp</p>
                </NavLink>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;
