import { Router } from "express";
import { emailSend, emailAuth, signUp } from "../Controller/userController";
import routes from "../routes";

const router = Router();

router.post(routes.emailSend, emailSend);
router.post(routes.emailAuth, emailAuth);
router.post(routes.signUp, signUp);

export default router;
