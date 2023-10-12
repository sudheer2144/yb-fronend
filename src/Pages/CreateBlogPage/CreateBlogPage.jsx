import React, { useState } from "react";
import "./styles.css";
import InputComponent from "../../Components/InputComponent/InputComponent";
import LoadingButton from "../../Components/CustomButton/LoadingButton";
import TextAreaInput from "../../Components/InputComponent/TextAreaInput";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

const CreateBlogPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogImageURL, setBlogImageURL] = useState("");

  const getLoggedUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  async function handleClick() {
    if (blogTitle && blogDescription && getLoggedUser && blogImageURL) {
      try {
        setIsLoading(true);
        const res = await axios.post(
          "https://yb-backend.vercel.app/api/blog/create",
          {
            title: blogTitle,
            description: blogDescription,
            image: blogImageURL,
            user: getLoggedUser.userId,
            createdOn: new Date(Date.now()).toDateString(),
          }
        );
        toast.success(res.data.message);
        setIsLoading(false);
        setBlogImageURL("");
        setBlogTitle("");
        setBlogDescription("");
        navigate(`/blog/${res.data.blogId}`);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    } else {
      toast.info("Enter valid values !");
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="inputContainer create-blog-container">
        <h2>Create Blog</h2>
        <InputComponent
          type={"text"}
          value={blogTitle}
          setState={setBlogTitle}
          placeholder={"Title"}
        />
        <InputComponent
          type={"text"}
          value={blogImageURL}
          setState={setBlogImageURL}
          placeholder={"Cover Image URL (only Google Drive)"}
        />
        <TextAreaInput
          value={blogDescription}
          setState={setBlogDescription}
          placeholder={"Enter Content"}
        />
        {
          // loading ? <Loader height={"39px"} /> :
          // <Button text={"Login"} handleClick={handleClick} loading={loading} />
          <LoadingButton
            onClcik={handleClick}
            loading={isLoading}
            text={"Create"}
          />
        }
      </div>
    </div>
  );
};

export default CreateBlogPage;
