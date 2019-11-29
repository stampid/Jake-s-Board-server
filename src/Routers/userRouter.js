import { Router } from "express";
import { emailSend, emailAuth } from "../Controller/userController";
import routes from "../routes";

const router = Router();

router.post(routes.emailSend, emailSend);
router.post(routes.emailAuth, emailAuth);

export default router;
