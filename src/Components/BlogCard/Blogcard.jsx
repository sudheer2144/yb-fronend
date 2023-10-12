import React from "react";
import "./styles.css";
import { useNavigate } from "react-router";
import LazyImage from "../LazyLoadImage/LazyLoadImage";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";

const Blogcard = ({ blog, setDeletedState }) => {
  const navigate = useNavigate();
  const getLoggedInUser = useSelector((state) => state.user.user);
  function handleClick(e) {
    e.stopPropagation();
    navigate(`/blog/${blog._id}`);
  }

  function updateBlogClick(e) {
    e.stopPropagation();
    navigate(`blog/update/${blog._id}`);
  }

  async function deleteBlogClick(e) {
    e.stopPropagation();
    if (window.confirm("Are you sure wanna delete ?") == true) {
      try {
        const res = await axios.delete(
          `https://yb-backend.vercel.app/api/blog/delete/${blog._id}`
        );
        toast.success(res.data.message);
        setDeletedState((state) => !state);
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <>
      <div className="blog-card" onClick={handleClick}>
        <div className="blog-image-section">
          <LazyImage image={blog.image} />
        </div>
        <div className="blog-details-section">
          <h1 className="blog-title">{blog.title}</h1>
          <h3 className="blog-user-name">-by {blog.user.name}</h3>
          <p className="blog-date">{blog.createdOn}</p>
        </div>
        <div className="blog-content-section">
          <p className="blog-content">{blog.description.slice(0, 500)} ...</p>
        </div>
        {getLoggedInUser && getLoggedInUser.userId == blog.user._id && (
          <div className="btn-section">
            <button className={"update-btn"} onClick={updateBlogClick}>
              <BsPencilSquare />
            </button>
            <button className="delete-btn" onClick={deleteBlogClick}>
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogcard;
