import mongoose, { Schema } from "mongoose";

const mailSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    usecase: {
      type: String,
      required: true,
    },
    used: {
      type: Number,
      default: 0,
      required: false,
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

export = mongoose.model("Mail", mailSchema);
