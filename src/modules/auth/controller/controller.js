import { CustomerModel } from "../../../../DB/model/customer_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { EmployeeModel } from "../../../../DB/model/employee_model.js";
export const confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decode = jwt.verify(token, process.env.EMAILTOKEN);

    if (!decode) {
      next(new Error("invalid token", { cause: 400 }));
    } else {
      const user = await CustomerModel.findOneAndUpdate(
        { _id: decode.id, confirmEmail: false },
        { confirmEmail: true }
      );

      if (!user) {
        next(new Error("user already confirmed", { cause: 400 }));
      } else {
        res.status(200).json({ message: "email confirmed pleaze login" });
      }
    }
  } catch (err) {
    next(new Error(err.message, { cause: 400 }));
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await CustomerModel.findOne({ email });
    let isAdmin;
    if (!user) {
      user = await EmployeeModel.findOne({ email });
      if (user) {
        isAdmin = true;
      }
    }
    if (!user) {
      next(new Error("not register this account", { cause: 400 }));
    } else {
      if (!isAdmin && !user.confirmEmail) {
        next(new Error("please confirmEmail", { cause: 400 }));
      } else {
        const match = bcrypt.compare(password, user.password);
        if (!match) {
          next(new Error("invalid account", { cause: 400 }));
        } else {
          const token = jwt.sign({ id: user._id }, process.env.LOGINTOKEN);
          res.status(200).json({ message: "logged in", token });
        }
      }
    }
  } catch (err) {
    next(new Error(err.message, { cause: 400 }));
  }
};
