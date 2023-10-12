import React, { useEffect, useState } from "react";
import "./styles.css";
import { useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import LazyLoadImage from "../../Components/LazyLoadImage/LazyLoadImage";
import LazyImage from "../../Components/LazyLoadImage/LazyLoadImage";

const BlogPage = () => {
  const { blogID } = useParams();
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getBlog() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://yb-backend.vercel.app/api/blog/${blogID}`
        );
        setBlog(res.data.blog);
        setIsLoading(false);
      } catch (error) {
        toast.error("Something wen wrong");
        setIsLoading(false);
      }
    }
    getBlog();
  }, [blogID]);
  return (
    <>
      {isLoading && <Loader />}
      {blog && (
        <div className="blog-page">
          <div className="back-image">
            <LazyImage image={blog.image} loader={false} />
          </div>
          <div className="blog-page-title">
            <h1>{blog.title}</h1>
          </div>
          <div className="blog-page-user">
            <h3>
              {blog.user.name}
              <span>/{blog.createdOn}</span>
            </h3>
          </div>
          <div className="blog-page-image-section">
            <div className="blog-page-image">
              <LazyImage image={blog.image} />
            </div>
          </div>
          <div className="blog-page-content-section">
            <>
              {blog.description.split(". ").map((txt, index) => {
                return (
                  <p className="blog-page-content" key={index + 1}>
                    {txt}.
                  </p>
                );
              })}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogPage;
