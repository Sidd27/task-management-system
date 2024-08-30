import express from "express";
import {
  registerController,
  loginController,
  getUserProfileController,
} from "../controllers/authController.js";
import passport from "../config/passport.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getUserProfileController
);

export default router;
