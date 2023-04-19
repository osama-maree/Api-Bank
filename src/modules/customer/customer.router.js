import {Router} from "express"
import { auth } from "../../middleware/auth.js";
import { role } from "../../services/role.js";
import { convertMoney, viewAccount } from "./controller/controller.js";
const router=Router()

router.get('/viewaccount',auth([role.user]),viewAccount)
router.post('/convert',auth([role.user]),convertMoney)
export default router;