const express = require("express");
const router = require("./src/routers/router");
const connectDB = require("./src/configs/db");
const cors = require("cors");
const bodyParser = require("body-parser");
require ("dotenv").config()

const app = express();
const port = process.env.Port || 5000
const http = require('http');
  
let corsOption = {
    origin: "http://localhost:4200"
  };

connectDB();
 

app.use(cors());
app.use(express.urlencoded({extended: true }));
app.use(router);
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app);

server.listen(port,() => {
    console.log(`Server running at port `+port);
  });
  
