import React, { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loader from "../Loader/Loader";
import "./styles.css";

const LazyImage = ({ image, loader = true }) => {
  const [stopLoader, setStopLoader] = useState(false);
  function displayNone() {
    setStopLoader(true);
  }
  return (
    <>
      {!stopLoader && loader && (
        <div className="loader-comp">
          <Loader />
        </div>
      )}
      <LazyLoadImage
        alt={"image.alt"}
        effect="blur"
        src={image}
        delayTime={1000}
        onLoad={displayNone}
      />
    </>
  );
};

export default LazyImage;
