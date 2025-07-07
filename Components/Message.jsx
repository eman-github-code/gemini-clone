import React from "react";

function Message({ text, sender }) {
  return (
    <div className={`message ${sender === "user" ? "user" : "bot"}`}>
      <div className="bubble">{text}</div>
    </div>
  );
}

export default Message;
