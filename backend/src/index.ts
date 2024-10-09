import express from "express"
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import cookieParser from "cookie-parser";
import { app, server } from "./socket/Socket.js";


app.use(express.json())
app.use(cookieParser());

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)

server.listen(3001,()=>console.log('server is running at port 3001'))