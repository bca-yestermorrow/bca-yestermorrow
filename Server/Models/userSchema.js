const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
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
    required: true,
  },
  classes: {
    type: [String]
  },
  program: {
      type: String
  },
  picture: {
    type: Image,
  },
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

module.exports = mongoose.model("User", UserSchema)