const express = require("express");
const {
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginAdmin);
router.all("/login", (req, res) => {
  res.set("Allow", "POST").status(405).json({
    success: false,
    message: "Use POST /api/auth/login with email and password in the JSON body",
  });
});
router.post("/refresh", refreshAccessToken);
router.post("/logout", logoutAdmin);

module.exports = router;
