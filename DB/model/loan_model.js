import { model, Schema, Types } from "mongoose";
const LoanSchema = new Schema({
  customer_id: {
    type: Types.ObjectId,
    required: true,
    ref: "customer",
  },
  branch_id: {
    type: Types.ObjectId,
    required: true,
    ref: "branch",
  },
  amount: {
    type: String,
    required: true,
  },
  type_id: {
    type: Types.ObjectId,
    required: true,
    ref: "laontype",
  },
});
export const Loan_Model = model("name", LoanSchema);
