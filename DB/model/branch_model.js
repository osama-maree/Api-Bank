import { model, Schema } from "mongoose";
const branchSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});
export const branchModel = model("branch", branchSchema);