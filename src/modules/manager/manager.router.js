import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import validation from "../../middleware/validation.js";
import { role } from "../../services/role.js";
import {
  addBranch,
  createAccountForEmp,
  getemployee,
  updateBranchPhone,
} from "./controller/controller.js";
import { signupValidation } from "./controller/manager.validation.js";
const router = Router();
router.post(
  "/createaccount",
  auth([role.manager]),
  validation(signupValidation),
  createAccountForEmp
);
router.post("/openbranch", auth([role.manager]), addBranch);
router.get("/getemployee", auth([role.manager]), getemployee);
router.patch("/updatebranchphone/:id", auth([role.manager]), updateBranchPhone);
export default router;
