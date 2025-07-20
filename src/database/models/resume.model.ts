import mongoose, { Schema } from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    latest: {
      type: Boolean,
      default: true,
      required: false,
    },
    rank: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export = mongoose.model("Resume", resumeSchema);
