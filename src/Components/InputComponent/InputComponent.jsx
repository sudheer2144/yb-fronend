import React from "react";
import "./styles.css";

const InputComponent = ({
  type,
  value,
  placeholder,
  setState,
  customClass = "",
}) => {
  return (
    <>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setState(e.target.value);
        }}
        className={`custom-input ${customClass}`}
      />
    </>
  );
};

export default InputComponent;
