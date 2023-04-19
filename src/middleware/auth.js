import jwt from "jsonwebtoken";
import { CustomerModel } from "../../DB/model/customer_model.js";
import { EmployeeModel } from "../../DB/model/employee_model.js";
export const auth = (access = []) => {
  return async (req, res, next) => {
    try {
      let { token } = req.headers;
      if (!token.startsWith(process.env.authBearerToken)) {
        next(new Error("error token", { cause: 400 }));
      } else {
        token = token.split("__")[1];
        const decoded = await jwt.verify(token, process.env.LOGINTOKEN);
        let user = await CustomerModel.findById(decoded.id);
        if (!user) {
          user = await EmployeeModel.findById(decoded.id);
        }
        if (!user) {
          next(new Error("user not register", { cause: 400 }));
        }
        if (!access.includes(user.role)) {
          next(new Error("user is not authorized", { cause: 400 }));
        }
        req.user = user;
        next();
      }
    } catch (err) {
      next(new Error(err.message, { cause: 400 }));
    }
  };
};
