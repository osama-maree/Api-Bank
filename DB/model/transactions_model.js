import { model, Schema, Types } from "mongoose";
const transactionSchema = new Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    type_id: {
      type: Types.ObjectId,
      required: true,
      ref: "typetrans",
    },
    account_id: {
      type: Types.ObjectId,
      required: true,
      ref: "account",
    },
    employee_id: {
      type: Types.ObjectId,
      required: true,
      ref: "employee",
    },
  },
  { timestamps: true }
);
export const Transaction_Model = model("transaction", transactionSchema);