import mongoose, { Schema, models } from "mongoose";
import { suToolsConnection } from "../connectDB";

const userSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    role: String,
  },
  { collection: "users" }
);

const User = models.User || suToolsConnection.model("User", userSchema);

export default User;
