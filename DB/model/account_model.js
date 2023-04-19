import { model, Schema, Types } from "mongoose";
const accountSchema = new Schema(
  {
    balance: {
      type: Number,
      default: 0,
    },
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
    typeAccount: {
      type: Types.ObjectId,
      required: true,
      ref: "type",
    },
  },
  { timestamps: true }
);
export const Account_Model = model("account", accountSchema);