import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: true,
  },
  addedDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["pending", "completed", "in_progress"],
    default: "pending",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

export const Tasks =
  mongoose.models.Tasks || mongoose.model("Tasks", TaskSchema);
