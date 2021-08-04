const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
// how to encrypt this?
  password: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
  },
  classes: {
    type: [String]
  },
  program: {
      type: String
  },
  // picture: {
  //   type: Image,
  // },
  location: {
      city: {
          type: String
      },
      state: {
          type: String
      },
      country: {
          type: String
      },
  },
});

const User = mongoose.model("User", UserSchema)
module.exports = User