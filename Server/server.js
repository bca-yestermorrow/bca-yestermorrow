require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const port = process.env.PORT || 5000
const app = express()
const staticDir = "./client/public"
const User = require("./Models/userSchema.js")
mongoose.connect(`mongodb+srv://YestermorrowAdmin:${process.env.PASS}@cluster0.u2itl.mongodb.net/yestermorrow?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
  console.log("in /signup post");
  if (req.body.password === req.body.confirmPassword) {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.redirect("/");
  } else {
    console.log("in else statement");
    // stops user from being sent to the database
    return res.sendStatus(400);
  }
});

app.get("/login", async (req, res) => {
  console.log("where r we")
  let currentUser = await User.find({email: req.body.email, password: req.body.password})
  let array = []
  await currentUser.forEach((user) => {
    array.push(user)
  })
  console.log(array)
  console.log("in login")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected");
});
