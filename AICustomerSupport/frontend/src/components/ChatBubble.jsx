import React from "react";
import "./../styles.css";

const ChatBubble = ({ role, content }) => (
  <div className={role === "user" ? "bubble user" : "bubble assistant"}>
    {content}
  </div>
);

export default ChatBubble;