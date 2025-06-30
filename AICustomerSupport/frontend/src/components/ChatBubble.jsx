import React from "react";
import "./../styles.css";

const ChatBubble = ({ role, content }) => {
  console.log("ChatBubble content:", content);
  return (
  <div className={role === "user" ? "bubble user" : "bubble assistant"}>
    {/* PARSE THE HTML CONTENT */}
    <span dangerouslySetInnerHTML={{ __html: content }} />
  </div>
)};

export default ChatBubble;