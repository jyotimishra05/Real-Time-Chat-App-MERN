const express =  require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes= require("./routes/userRoutes")
const messagesRoute= require("./routes/messagesRoute")
const socket = require("socket.io")
const PORT =process.env.PORT ||5001;

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);  //userRoutes = register
app.use("/api/messages" ,messagesRoute);
// app.use("api/auth" ,avatar)

mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser :true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db is connected")
}).catch((error)=>{
    console.log(error.message)
})

const server=app.listen(PORT ,()=>{
    console.log("server is running on port number 5001")
})

const io = socket(server, {
    cors: {
      origin:process.env.ORIGIN,
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
        console.log(data)
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });