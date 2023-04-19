import { model, Schema } from "mongoose";
const typeSchema = new Schema({
  desc: {
    type: String,
    required: true,
  },
  interestRate: {
    type: String,
    required: true,
  },
});
export const TypeAccount_Model = model("type", typeSchema);