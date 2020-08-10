import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "../infoBar/InfoBar";
import Input from "../input/Input";
import Messages from "../messages/Messages";
import TextContainer from "../textContainer/TextContainer";

let socket;

function Chat(props) {
  const [name] = useState(props.location.state.name);
  const [room] = useState(props.location.state.room);
  const [roomUsers, setRoomUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ENDPOINT = "https://messenger-chat-application.herokuapp.com/";

  //emit join
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.on("roomData", ({ users }) => {
        setRoomUsers(users);
      });
      socket.off();
    };
  }, [ENDPOINT, name, room]);

  //catch the emit message from backend
  useEffect(() => {
    socket.once("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setRoomUsers(users);
    });
  }, [messages]);

  //Sending message function
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer currentUser={name} users={roomUsers} />
    </div>
  );
}

export default Chat;
