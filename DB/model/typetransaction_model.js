import { model, Schema } from "mongoose";
const typeSchame = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const TypeTransaction_Model = model("typetrans", typeSchame);
