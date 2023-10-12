import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import Blogcard from "../../Components/BlogCard/Blogcard";
import "./styles.css";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState();
  const [isBlogDeleted, setDeletedState] = useState(true);

  useEffect(() => {
    async function getAllBlogs() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://yb-backend.vercel.app/api/blog/all-blogs"
        );
        setBlogs(res.data.allBlogs);
        setLoading(false);
      } catch (error) {
        toast.error("Something wen wrong");
        setLoading(false);
      }
    }
    getAllBlogs();
  }, [isBlogDeleted]);

  return (
    <div className="home-page">
      {loading && <Loader width="10%" />}
      {!loading &&
        blogs &&
        blogs.map((blog, index) => {
          return (
            <Blogcard
              blog={blog}
              key={index + 1}
              setDeletedState={setDeletedState}
            />
          );
        })}
    </div>
  );
};

export default HomePage;
