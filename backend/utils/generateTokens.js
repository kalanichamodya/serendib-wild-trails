const jwt = require("jsonwebtoken");

const generateAccessToken = (admin) => {
  return jwt.sign(
    {
      adminId: admin._id.toString(),
      role: admin.role,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    }
  );
};

const generateRefreshToken = (admin) => {
  return jwt.sign(
    {
      adminId: admin._id.toString(),
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};