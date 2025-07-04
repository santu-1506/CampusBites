const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Redirect to Google for authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback URL
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login", // Redirect to login on failure
    session: false, // We are using JWTs, not sessions
  }),
  (req, res) => {
    // Successful authentication
    const payload = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Redirect to the frontend with the token
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
  }
);

module.exports = router; 