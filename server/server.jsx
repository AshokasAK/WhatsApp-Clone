const express = require("express");
const mongoose = require("mongoose");
const PORT = 8500;
const Rooms = require("./dbRooms.jsx");
const Message = require("./dbMessages.jsx");
const Pusher = require("pusher");
const cors = require("cors");

const app = express();

const pusher = new Pusher({
  appId: "1854766",
  key: "90c2e17ae608825f78ca",
  secret: "fd4f55cbc9c7958eb5ba",
  cluster: "ap2",
  useTLS: true,
});

app.use(express.json());
app.use(cors());

const DB_URL =
  "mongodb+srv://ashokkumarmoff:HSpcMK5ynM7CT8wd@whatsappclone.kmiphdx.mongodb.net/?retryWrites=true&w=majority&appName=whatsappclone";
mongoose.connect(DB_URL);
const db = mongoose.connection;

db.once("open", () => {
  console.log("DB is connected");

  const roomCollection = db.collection("rooms");
  const changeStream = roomCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const roomDetails = change.fullDocument;
      pusher.trigger("room", "inserted", roomDetails);
      console.log("Its working");
    } else {
      console.log("The trigger is not working");
    }
  });

  const msgCollection = db.collection("messages");
  const changeStream1 = msgCollection.watch();

  changeStream1.on("change", (change) => {
    if (change.operationType === "insert") {
      const msgDetails = change.fullDocument;
      pusher.trigger("msg", "inserted", msgDetails);
      console.log("Its working");
    } else {
      console.log("The trigger is not working");
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello From");
});

app.get("/all/rooms", async (req, res) => {
  const rooms = await Rooms.find({});
  try {
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.get("/all/messages", async (req, res) => {
  const message = await Message.find({});
  try {
    res.status(200).json(message);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/rooms/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const room = await Rooms.findById(id);
    res.json(room).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/messages/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const message = await Message.find({ roomId: id });
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/group/create", async (req, res) => {
  try {
    const name = req.body.groupName;
    const data = await Rooms.create({ name });
    res.status(201).send(data);
  } catch (err) {
    console.error("Error creating room:", err);
    res.status(500).send(err);
  }
});

app.post("/message/new", async (req, res) => {
  const dbMessages = req.body;
  try {
    const datamessage = await Message.create(dbMessages);
    res.status(200).send(datamessage);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log("server is running");
});
