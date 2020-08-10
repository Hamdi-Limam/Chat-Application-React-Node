import React from "react";
import "./Input.css";
function Input({ message, setMessage, sendMessage }) {
  return (
    <form className="form">
      <input
        placeholder="Type a message..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="input"
      />
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </form>
  );
}

export default Input;
