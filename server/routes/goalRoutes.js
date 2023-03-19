import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import {
  getGoal,
  setGoal,
  editGoal,
  updateGoal,
  delGoal,
  delALL,
} from "../controllers/GoalController.js";

router.get("/", protect, getGoal);
router.post("/create", protect, setGoal);
router.get("/edit/:id", protect, editGoal);
router.put("/update/:id", protect, updateGoal);
router.delete("/del/:id", protect, delGoal);
router.delete("/delete/all", delALL);

export default router;
