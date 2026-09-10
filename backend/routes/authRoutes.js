const express = require("express");
const {
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  getCurrentAdmin,
} = require("../controllers/authController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginAdmin);

router.all("/login", (req, res) => {
  res.set("Allow", "POST").status(405).json({
    success: false,
    message:
      "Use POST /api/auth/login with email and password in the JSON body",
  });
});

router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutAdmin);

// Protected admin route
router.get("/me", protectAdmin, getCurrentAdmin);

module.exports = router;