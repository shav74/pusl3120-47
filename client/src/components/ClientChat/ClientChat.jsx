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
              <h2>Ask from others</h2>
              <p>
                You can use this portal to get in touch with others and chat by simply sending a message through the given chat section.
              </p>
            </div>
            <div className="instruction-field">
              <h2>Please follow the below guidelines:</h2>
              <br />
              <h2>1. How To Chat:</h2>
              <p>
                Use the chat bar to insert your message and select enter. Once you have sent a message, you will see the new blue area appeared with the message you entered.
                <br />Once someone reply to your message, you will see a new gray area with their reply.
              </p>
              <br />
              <h2>2. Privacy Matters:</h2>
              <p>
                Safeguard personal information and avoid sharing details without
                consent.
              </p>
              <br />
              <h2>2. No Discrimination:</h2>
              <p>
                Foster an inclusive environment by avoiding discriminatory language
                or behavior.
              </p>
              <br />
              <h2>3. No Discrimination:</h2>
              <p>
                Foster an inclusive environment by avoiding discriminatory language
                or behavior.
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
