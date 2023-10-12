import React from "react";
import "./styles.css";

const TextAreaInput = ({ value, placeholder, setState }) => {
  return (
    <>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setState(e.target.value);
        }}
        className={`custom-textarea-input`}
      />
    </>
  );
};

export default TextAreaInput;
