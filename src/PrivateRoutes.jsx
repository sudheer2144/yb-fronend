import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

const PrivateRoutes = () => {
  const getLoggedInUser = useSelector((state) => state.user.user);
  if (getLoggedInUser) {
    return <Outlet />;
  }
  return <Navigate to={"/login"} replace />;
};

export default PrivateRoutes;
