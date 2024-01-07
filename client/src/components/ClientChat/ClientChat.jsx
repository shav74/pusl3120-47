import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./ClientChat.css";

const socket = io("http://127.0.0.1:4000");

const ClientChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socket.on("message", (data) => {
      const newMessage = {
        content: data,
        isUser: false, // Assuming messages from others are not user messages
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(newMessage);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      socket.emit("message", inputValue);
      setInputValue("");

      // Add the sent message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: `You: ${inputValue}`, isUser: true },
      ]);
    }
  };

  return (
    <div className="instructions">
      <div className="instructions-container">
        <h1>Chat Room</h1>
        <div className="divider-section">
          <div className="left-side">
            <div className="instruction-field">
              <h2>1. Respect Others:</h2>
              <p>
                Treat everyone with kindness and respect, refraining from offensive
                language or personal attacks.
              </p>
            </div>
            <div className="instruction-field">
              <h2>2. Privacy Matters:</h2>
              <p>
                Safeguard personal information and avoid sharing details without
                consent.
              </p>
            </div>
            <div className="instruction-field">
              <h2>3. No Discrimination:</h2>
              <p>
                Foster an inclusive environment by avoiding discriminatory language
                or behavior.
              </p>
            </div>
            <div className="instruction-field">
              <h2>4. Mindful Posting:</h2>
              <p>
                Think before posting, avoiding spam, excessive use of capital
                letters, or disruptive behavior.
              </p>
            </div>
          </div>

          <div className="right-side">
            <div className="chat-side">
              <form className="chat-form" onSubmit={sendMessage}>
                <input
                  type="text"
                  placeholder="Your message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
              <ul className="chat-list">
                {messages.map((message, index) => (
                  <li
                    key={index}
                    className={`message ${message.isUser ? "user" : "other"}`}
                  >
                    {message.content}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>



      </div>
    </div >
  );
};

export default ClientChat;
