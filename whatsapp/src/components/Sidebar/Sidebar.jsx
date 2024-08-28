import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Avatar, IconButton, Link } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { useStateValue } from "../ContextApi/StateProvider";
import SidebarChat from "../SidebarChat/SidebarChat";
import axios from "axios";
import Pusher from "pusher-js";

const sidebar = ({ apiUrl }) => {
  const [{ user }] = useStateValue();
  // const addNewChat = true
  const [rooms, setRooms] = useState([]);

  const handleRooms = async () => {
    const url = apiUrl+"all/rooms";
    await axios.get(url).then((res) => {
      res.data;
      setRooms(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    handleRooms();

    const pusher = new Pusher("90c2e17ae608825f78ca", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("room");
    channel.bind("inserted", function (room) {
      console.log(room);
      setRooms((prevRooms) => [...prevRooms, room]);
      // setRooms(room)
    });
  }, []);

  const createRoom = async () => {
    const roomName = prompt("Please enter the room name");
    if (roomName) {
      try {
        const url = apiUrl + "group/create";
        const result = await axios.post(url, {
          groupName: roomName,
        });
        console.log(result);
      } catch (err) {
        console.log(err + "hii");
      }
    }
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_header">
          <Avatar src={user.photoURL} />
          <div className="sidebar_headerRight">
            <IconButton>
              <DonutLargeIcon fontSize="medium" />
            </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div className="sidebar_search">
          <div className="sidebar_searchcontainer">
            <IconButton>
              <SearchIcon className="search-icon" />
            </IconButton>
            <input type="text" placeholder="Search or start new chat" />
          </div>
        </div>
        <div className="sidebar_chats">
          <div className="sidebarchat" onClick={createRoom}>
            <h2>Add New Chat</h2>
          </div>
          {rooms &&
            rooms.map((room) => (
              <SidebarChat
                key={room._id}
                name={room.name}
                id={room._id}
                apiUrl={apiUrl}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default sidebar;
