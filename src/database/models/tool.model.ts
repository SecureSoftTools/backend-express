import mongoose, { Schema } from "mongoose";

const toolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    icon: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
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

export = mongoose.model("Tool", toolSchema);
