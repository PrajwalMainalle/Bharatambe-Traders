const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const rateLimiter = require("../middleware/rateLimiter");

// 5 requests max per 15 minutes window
const resetRateLimit = rateLimiter(5, 15 * 60 * 1000);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/forgot-password", resetRateLimit, forgotPassword);
router.post("/reset-password", resetRateLimit, resetPassword);

module.exports = router;
