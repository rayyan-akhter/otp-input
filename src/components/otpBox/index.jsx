import React, { useState, useRef } from "react";
import "./style.css";

function isNumeric(value) {
  return !isNaN(value);
}
export const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];


  

  const handleInputChange = (e, index) => {
   
    const value = e.target.value;

    if (value === " ") {
      e.target.value = ""; 
      return;
    }
     if (!isNumeric(value)) {
    
      return;
    }
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);


    if (value === "") {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    } else if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const firstSixCharacters = pasteData.slice(0, 6);
    const updatedOtp = firstSixCharacters.split("");
    setOtp(updatedOtp);
    updatedOtp.forEach((value, index) => {
      if (inputRefs[index]) {
        inputRefs[index].current.value = value;
      }
    });
    inputRefs[inputRefs.length - 1].current.focus();
  };
  
  return (
    <div className="main">
      <h2>Enter Your Otp</h2>

      <div className="inputFieldContainer" onPaste={handlePaste}>
        {otp.map((data, index) => (
          <input
            type="text"
            className="input"
            maxLength={1}
            value={data}
            onChange={(e) => handleInputChange(e, index)}
            onFocus={(e) => e.target.select()}
            key={index}
            ref={inputRefs[index]}
          />
        ))}
      </div>
    </div>
  );
};

