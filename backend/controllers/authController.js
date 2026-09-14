const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/auth",
};

// POST /api/auth/login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password || email.length > 254 || password.length > 1024) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    }).select("+password +refreshTokenHash");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await admin.comparePassword(password);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);

    admin.refreshTokenHash = hashToken(refreshToken);
    await admin.save();

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      accessToken,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// POST /api/auth/refresh
const refreshAccessToken = async (req, res) => {
  try {
    const currentRefreshToken = req.cookies.refreshToken;

    if (!currentRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is missing",
      });
    }

    const decoded = jwt.verify(
      currentRefreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const admin = await Admin.findById(decoded.adminId).select(
      "+refreshTokenHash"
    );

    if (
      !admin ||
      !admin.refreshTokenHash ||
      admin.refreshTokenHash !== hashToken(currentRefreshToken)
    ) {
      res.clearCookie("refreshToken", {
        ...refreshCookieOptions,
        maxAge: undefined,
      });

      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // Refresh token rotation
    const newAccessToken = generateAccessToken(admin);
    const newRefreshToken = generateRefreshToken(admin);

    admin.refreshTokenHash = hashToken(newRefreshToken);
    await admin.save();

    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

    return res.status(200).json({
  success: true,
  accessToken: newAccessToken,
  admin: {
    id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  },
});

  } catch (error) {
    res.clearCookie("refreshToken", {
      ...refreshCookieOptions,
      maxAge: undefined,
    });

    return res.status(401).json({
      success: false,
      message: "Refresh token is invalid or expired",
    });
  }
};

// POST /api/auth/logout
const logoutAdmin = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );

        const admin = await Admin.findById(decoded.adminId).select(
          "+refreshTokenHash"
        );

        if (
          admin &&
          admin.refreshTokenHash === hashToken(refreshToken)
        ) {
          admin.refreshTokenHash = null;
          await admin.save();
        }
      } catch {
        // Invalid token එකක් වුණත් cookie එක clear කරනවා
      }
    }

    res.clearCookie("refreshToken", {
      ...refreshCookieOptions,
      maxAge: undefined,
    });

    return res.status(200).json({
      success: true,
      message: "Admin logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};



// GET /api/auth/me
const getCurrentAdmin = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
    },
  });
};

module.exports = {
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  getCurrentAdmin,
};
