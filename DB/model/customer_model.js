import { model, Schema } from "mongoose";
const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
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
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    sendCode: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: "user",
    },
    id_pic: String,
  },
  { timestamps: true }
);
export const CustomerModel = model("customer", CustomerSchema);
