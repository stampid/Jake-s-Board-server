import { Router } from "express";
import {
  emailSend,
  emailAuth,
  signUp,
  signIn,
  signOut
} from "../Controller/userController";
import routes from "../routes";
import { verifyJWT } from "../middleware/jwtHelper";

const router = Router();

router.post(routes.emailSend, emailSend);
router.post(routes.emailAuth, emailAuth);
router.post(routes.signUp, signUp);
router.post(routes.signIn, signIn);

router.use("/", verifyJWT);

router.get(routes.signOut, signOut);

export default router;
