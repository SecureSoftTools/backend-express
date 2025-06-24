import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resume: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resume",
        required: true,
      },
    ],
    mail: [
      {
        type: Schema.Types.ObjectId,
        ref: "Mail",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export = mongoose.model("User", userSchema);
