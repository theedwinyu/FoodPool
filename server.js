const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http")
const path = require("path")

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect( process.env.MONGODB_URI || uri, { dbName:"", useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const classesRouter = require('./routes/classes');

app.use('/classes', classesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});