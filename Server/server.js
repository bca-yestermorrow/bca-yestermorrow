require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const staticDir = "./client/public";
const User = require("./Models/userSchema.js");
mongoose.connect(
  `mongodb+srv://YestermorrowAdmin:${process.env.PASS}@cluster0.u2itl.mongodb.net/yestermorrow?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "../client/public/index.html");
});

app.post("/signup", async (req, res) => {
  if (req.body.password === req.body.confirmPassword) {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.redirect("/home");
  } else {
    // stops user from being sent to the database
    return res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/lat", (req, res) => {
  res.sendFile(__dirname + "/../client/public/lat.json");
});

app.get("/lng", (req, res) => {
  res.sendFile(__dirname + "/../client/public/lng.json");
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected");
});

//For map

app.get("/lat", (req, res) => {
  res.sendFile(__dirname + "/client/public/lat.json");
});

app.get("/lng", (req, res) => {
  res.sendFile(__dirname + "/client/public/lng.json");
});

app.get("/work", (req, res) => {
  res.sendFile(__dirname + "/work.json");
});
