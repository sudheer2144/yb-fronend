import React from "react";
import { BallTriangle } from "react-loader-spinner";
import "./Loader.css";

const Loader = ({ width = "20%" }) => {
  return (
    <div className="loader-container">
      <div>
        <BallTriangle width={width} color="var(--white)" radius={5} />
      </div>
    </div>
  );
};

export default Loader;
