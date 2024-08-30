import express from "express";
import passport from "../config/passport.js";
import {
  createTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/taskController.js";

const router = express.Router();

router.post(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  createTaskController
);
router.get(
  "/tasks",
  passport.authenticate("jwt", { session: false }),
  getTasksController
);
router.put(
  "/tasks/:id",
  passport.authenticate("jwt", { session: false }),
  updateTaskController
);
router.delete(
  "/tasks/:id",
  passport.authenticate("jwt", { session: false }),
  deleteTaskController
);

export default router;
