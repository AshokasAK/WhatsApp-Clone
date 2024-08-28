import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
// import axios from 'axios'
import { Link } from "react-router-dom";

const SidebarChat = ({ addNewChat, name, id, apiUrl }) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  // const createRoom =async()=>{
  //   const roomName = prompt("Please enter the room name")
  //   if(roomName){
  //     try{

  //       const url =apiUrl+'group/create'
  //        const result = await axios.post(url,{
  //           groupName:roomName
  //         })
  //         console.log(result)
  //     }catch(err){
  //         console.log(err+"hii")
  //     }
  //   }
  // }

  return (
    <>
      <Link to={`/rooms/${id}`}>
        <div className="sidebarchat">
          <Avatar
            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}`}
          />
          <div className="sidebarChat_info">
            <h2>{name}</h2>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SidebarChat;
