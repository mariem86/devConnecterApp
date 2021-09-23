const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });

module.exports = async function () {
  try {
    await mongoose.connect(process.env.Mongo_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("The Database is Connected.....");
  } catch (error) {
    console.log("Error with connection with database");
  }
};