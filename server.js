const express = require("express");
const connectDB = require("./config/connectDB");
const path = require("path");
const app = express();

const authRouter= require("./routes/auth")
const profileRouter= require("./routes/profile")
const postRouter = require("./routes/posts")
//MiddleWare

app.use(express.json());


//Connect DB
connectDB();

//Routes
app.use("/api/auth", authRouter)
app.use("/api/profile",profileRouter)
app.use("/api/posts",postRouter)

//Serve Static assets in production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
  
  //Starting the Server
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, err => {
    if (err) throw console.log(err);
    console.log(`Server is running on PORT ${PORT} ...`);
  });