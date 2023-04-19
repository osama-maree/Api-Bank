import { model, Schema, Types } from "mongoose";
const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: Number,
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
    branch_id: {
      type: Types.ObjectId,
      required: true,
      ref: "branch",
    },
    sendCode: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["manager", "employee"],
      default: "employee",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const EmployeeModel = model("employee", EmployeeSchema);
