import express from 'express';

const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
  deleteAllUsers,
} from "../controllers/UserController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot", forgotPassword);
router.post("/resetPassword/:id", resetPassword);
router.get("/getme", protect, getMe);
router.delete("/delAll", deleteAllUsers);

export default router;
