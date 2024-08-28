import React, { Fragment, useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Attachfile from "@mui/icons-material/Attachfile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import "./Chat.css";
import MoreVert from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useStateValue } from "../ContextApi/StateProvider.jsx";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";

const Chat = ({ apiUrl }) => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [{ user }] = useStateValue();
  const { roomId } = useParams();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const handleChatRoom = async () => {
    const url = apiUrl + `rooms/${roomId}`;
    const result = await axios.get(url);
    // console.log(result.data)
    setRoomName(result.data.name);
    setUpdatedAt(result.data.updatedAt);
  };

  const handleChatMessage = async () => {
    const url = apiUrl + `messages/${roomId}`;
    const result = await axios.get(url);
    console.log(result.data);
    setMessages(result.data);
    // setUpdatedAt(result.data.updatedAt)
  };

  useEffect(() => {
    handleChatRoom();
    handleChatMessage();
  }, [roomId]);

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    await axios.post(apiUrl + "message/new", {
      message: input,
      name: user.displayName,
      timesatmp: new Date(),
      uid: user.uid,
      roomId: roomId,
    });
    setInput("");
  };

  useEffect(() => {
    const pusher = new Pusher("90c2e17ae608825f78ca", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("message");
    channel.bind("inserted", function (message) {
      console.log(room);
      setMessages((prevRooms) => [...prevRooms, message]);
    });
  }, []);

  return (
    <>
      <div className="chat">
        <div className="chat_header">
          <Avatar
            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`}
          />

          <div className="chat_headerInfo">
            <h3>{roomName ? roomName : "Welcome to whatsapp"}</h3>
            <p>
              {updatedAt
                ? `Last updated at ${new Date(updatedAt)
                    .toString()
                    .slice(0, 25)}`
                : "Please click on any chat"}
            </p>
          </div>

          <div className="chat_headerRight">
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <Attachfile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>

        <div className="chat_body">
          <p className="chat_message">
            <span className="chat_name">Ashokkumar</span>
            Hello From Ashok
            <span className="chat-timestamp">
              {new Date().toString().slice(0, 25)}
            </span>
          </p>

          {messages &&
            messages.map((message, index) => (
              <div>
                <p
                  className={`chat_message  ${
                    message.uid === user.uid && "chat_receiver"
                  }`}
                  key={index}
                >
                  <span className="chat_name">{message.name}</span>
                  {message.message}
                  <span className="chat-timestamp">
                    {new Date(message.timesatmp).toString().slice(0, 25)}
                  </span>
                </p>
              </div>
            ))}
        </div>

        <div className="chat_footer">
          <EmojiEmotionsIcon className="emoji" />
          <form action="">
            <input
              type="text"
              placeholder="Type message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={(e) => handleMessage(e)}>Send a message</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
