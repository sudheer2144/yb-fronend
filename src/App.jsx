import React from "react";
import { Route, Routes } from "react-router";
import Header from "./Components/Header/Header";
import { ToastContainer } from "react-toastify";
import LoginSignUp from "./Pages/LoginSignup/SignUpLoginPage";
import HomePage from "./Pages/HomePage/HomePage";
import CreateBlogPage from "./Pages/CreateBlogPage/CreateBlogPage";
import PrivateRoutes from "./PrivateRoutes";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import UpdateBlogPage from "./Pages/UpdateBlogPage/UpdateBlogPage";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <>
      <ToastContainer
        theme="dark"
        autoClose={2000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        className={"toast"}
        closeOnClick={true}
      />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/blog/:blogID" element={<BlogPage />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/create-blog" element={<CreateBlogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blog/update/:blogID" element={<UpdateBlogPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
