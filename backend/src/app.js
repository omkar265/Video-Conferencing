import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager";

import cors from "cors";

const app  = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended:true}));

app.get("/home",(req, res)=>{
    return res.json({"hello" :"world"})
});

const start = async() =>{
    app.set("mogno_user")
    const connectionDb = await mongoose.connect("mongodb+srv://omkarbjadhav2020_db_user:UjfXhsm06dALGs2T@video-conferencing.jz1haxu.mongodb.net/?appName=Video-Conferencing")
    
    console.log(`MONGO Connected DB Host: ${connectionDb.coonection.host}`)
    server.listen(app.get("port"), ()=>{
        console.log("Listing on port 8000")
    });
}

start();