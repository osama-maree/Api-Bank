import { Router } from "express";
import { confirmEmail, signin } from "./controller/controller.js";
const router = Router();
router.get("/confirmEmail/:token", confirmEmail);
router.post('/signin',signin)
export default router;
