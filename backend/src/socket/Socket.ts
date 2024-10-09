import http from "http";
import { Server } from "socket.io";
import express from "express";

//express app
const app = express();

//create http server
const server = http.createServer(app);

//initializ the socket.io server instance
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};

//store the online users
const userSocketMap: { [key: string]: string } = {}; // {userId: socketId}
//set up the event listener for the connection event
io.on("connection", (socket) => {
  //when client connect the data will receive in query
  const userId = socket.handshake.query.userId as string;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  //will broadcast the message to all the connected users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //disconnect when the user disconnect
  socket.on("disconnect", () => {
    //delete the disconnected user
    delete userSocketMap[userId];

    //it updated the users whihc are still connected
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
