const mongoose = require('mongoose');
const env = require("dotenv");
env.config();

const connectDB = () => {  
const pathURL = process.env.MongoDB_Url;
const connectionOption = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,   
  useCreateIndex: true,
  useFindAndModify: false, 
}
mongoose.connect(pathURL, connectionOption);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database Mongoose Connected !");
});

};

module.exports = connectDB;
