import express from "express";
import { userLogin, userLogout, userProfile, userRegister } from "../controllers/UserController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/user/register").post(userRegister);
router.route("/user/login").post(userLogin);
router.route("/user/logout").get(userLogout);
router.route("/user").get(isAuthenticated ,userProfile);

export default router;
