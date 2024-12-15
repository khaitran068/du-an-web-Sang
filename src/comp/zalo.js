import React from "react";
import "./zalo.css"; // File CSS chứa style cho nút

const ZaloButton = () => {
  return (
    <a href="https://zalo.me/0943696994" target="_blank" rel="noopener noreferrer" className="zalo-button">
      <img src="/zalo-icon.png" alt="Zalo" className="zalo-icon" />
    </a>
  );
};

export default ZaloButton;
