import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

export = mongoose.model("Resume", resumeSchema);
