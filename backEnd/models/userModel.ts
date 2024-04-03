/** @format */

import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, " Please check eMail"],
  },
  phoneNumber: {
    type: Number,
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, " Please check password"],
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: [true, " Please check createdAt"],
  },
  updatedAt: {
    type: Date,
    default: new Date(),
    required: [true, " Please check createdAt"],
  },
});
const User = model("User", userSchema);
export default User;
