import React, { useEffect, useState } from "react";
import InputComponent from "../../Components/InputComponent/InputComponent";
import LoadingButton from "../../Components/CustomButton/LoadingButton";
import TextAreaInput from "../../Components/InputComponent/TextAreaInput";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Loader from "../../Components/Loader/Loader";

const UpdateBlogPage = () => {
  const { blogID } = useParams();
  const getLoggedInUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getBlog() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://yb-backend.vercel.app/api/blog/${blogID}`
        );
        setBlog(res.data.blog);
        setBlogTitle(res.data.blog.title);
        setBlogDescription(res.data.blog.description);
        setIsLoading(false);
      } catch (error) {
        toast.error("Something wen wrong");
        setIsLoading(false);
      }
    }
    getBlog();
  }, [blogID]);

  async function handleClick() {
    if (blogTitle && blogDescription && getLoggedInUser) {
      try {
        setIsLoading(true);
        const res = await axios.put(
          `https://yb-backend.vercel.app/api/blog/update/${blogID}`,
          {
            title: blogTitle,
            description: blogDescription,
            user: getLoggedInUser.userId,
          }
        );
        toast.success(`Updated Successfully.`);
        setIsLoading(false);
        setBlogTitle("");
        setBlogDescription("");
        navigate(`/blog/${blogID}`);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
      }
    } else {
      toast.info("Enter valid values !");
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      {!blog && <Loader />}
      {blog && (
        <div className="inputContainer create-blog-container">
          <h2>Update Blog</h2>
          <InputComponent
            type={"text"}
            value={blogTitle}
            setState={setBlogTitle}
            placeholder={"Title"}
          />
          <TextAreaInput
            value={blogDescription}
            setState={setBlogDescription}
            placeholder={"Enter Content"}
          />
          {
            <LoadingButton
              onClcik={handleClick}
              loading={isLoading}
              text={"Update"}
            />
          }
        </div>
      )}
    </div>
  );
};

export default UpdateBlogPage;
