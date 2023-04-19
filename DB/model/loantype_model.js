import { model, Schema, Types } from "mongoose";
const laontype_Schema = new Schema({
  desc: {
    type: String,
    required: true,
  },
});
export const LoanType_Model = model("laontype", laontype_Schema);
