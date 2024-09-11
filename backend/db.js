const mongoose = require("mongoose");
const { Schema, model } = mongoose;

mongoose.connect(
  "mongodb+srv://user:<db_password>@cluster0.ovrlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trime: true,
    minLength: 1,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 50,
  },
});

const User = model("User", userSchema);
module.exports = {
  User,
};
