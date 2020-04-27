const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http")
const path = require("path")


const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');

require('dotenv').config();

const app = express();

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);

var server = http.createServer(app)


var io = require('socket.io')(server)

const uri = process.env.ATLAS_URI;
mongoose.connect( process.env.MONGODB_URI || uri, { dbName:"FoodPoolDB", useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

io.on('connection',(socket)=>{

  console.log("someone connected")

  socket.on("joinroom",(arg)=>{
    console.log('someone joined ' + arg)
    socket.join(arg)
  })

  socket.on("sentComment",(roomID, name, message)=>{
    console.log('sent comment ' + roomID + ", " + message);
    io.to(roomID).emit("newMessage", name, message);
  })

  socket.on("joinnotif",(roomID,user,order)=>{
    console.log("joinnotif")
    io.to(roomID).emit("joinnotif",user,order)
  })


})

// const restaurantsRouter = require('./routes/restaurants');

// app.use('/restaurants', restaurantsRouter);

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});