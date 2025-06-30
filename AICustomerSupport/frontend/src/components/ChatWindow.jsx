import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import chatStore from "../stores/chatStore";

const ChatWindow = observer(() => {
  const userId = "demoUser123";
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatStore.messages.length]);

  const handleSend = (msg) => {
    chatStore.sendMessage(userId, msg);
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-box">
          {chatStore.messages.map((msg, idx) => (
            <ChatBubble key={idx} {...msg} />
          ))}
          {chatStore.loading && (
            <div className="typing">Agent is typing...</div>
          )}
          <div ref={bottomRef} />
        </div>
      <ChatInput onSend={handleSend} />
      </div>
    </>
  );
});

export default ChatWindow;
