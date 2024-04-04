/** @format */

import { Schema, model } from "mongoose";

const adminUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    minlength: [6, "Please check password"],
    required: true,
  },
  role: {
    type: String,
    enum: ["Super_Admin", "Create_Admin", "Update_Admin", "View_Admin"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const AdminUser = model("AdminUser", adminUserSchema);
export default AdminUser;
