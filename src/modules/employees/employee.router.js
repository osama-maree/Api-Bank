import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import { role } from "../../services/role.js";
import {
  addTypeAccount,
  addtypeLoan,
  addtypeTransaction,
  addUser,
  CloseAccount,
  createAccount,
  deposit,
  getCustomer,
  Loan,
  withdraw,
} from "./controller/controller.js";
import {
  createAccountV,
  DepositAndWithdraw,
  signupValidation,
} from "./controller/employee.validation.js";
const router = Router();
//emp and manager he can create account for user
router.post(
  "/adduser",
  auth([role.employee, role.manager]),

  myMulter(multerValidation.image).single("image"),
  HME,
  validation(signupValidation),
  addUser
);
router.post(
  "/addtype",
  auth([role.employee]),
  validation(addTypeAccount),
  addTypeAccount
);
router.post(
  "/createaccount",
  auth([role.employee]),
  validation(createAccountV),
  createAccount
);
router.post(
  "/deposit/:type_id",
  auth([role.employee]),
  validation(DepositAndWithdraw),
  deposit
);
router.post(
  "/withdraw/:type_id",
  auth([role.employee]),
  validation(DepositAndWithdraw),
  withdraw
);
//complete other validation at same step
router.post("/addtrans", auth([role.employee]), addtypeTransaction);
router.get("/getcustomer", auth([role.employee]), getCustomer);
router.post("/closeaccount", auth([role.employee]), CloseAccount);
router.post("/loan", auth([role.employee]), Loan);
router.post("/addtypeloan", auth([role.employee]), addtypeLoan);

export default router;
