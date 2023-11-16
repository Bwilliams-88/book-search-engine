const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://brandonwilliams88:BLWaew13!@cluster0.qjimzsz.mongodb.net/?retryWrites=true&w=majority"
);

module.exports = mongoose.connection;
