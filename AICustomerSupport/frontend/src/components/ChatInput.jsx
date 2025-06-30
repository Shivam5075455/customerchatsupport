import React, { useRef, useState } from "react";

const ChatInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    if (textareaRef.current) {
        textareaRef.current.style.height = "48px"; // Reset to min height
      }
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "48px"; // Reset to min height
      // Calculate new height up to maxHeight (240px for 10 rows)
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 240; // 10 rows * 24px
      textareaRef.current.style.height =
        Math.min(scrollHeight, maxHeight) + "px";
    }
  };


  return (
    <div className="input-area">
      <textarea
      ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Type your message..."
        
        style={{
          resize: "none",
          width: "100%",
          minHeight: "48px",
          maxHeight: "240px",
          overflowY: "auto",
        }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
