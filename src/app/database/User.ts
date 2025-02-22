import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String }, // dane dostawy
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
