const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPass, resetPassword, loadUser, verifyEmail } = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/verify-email").post(verifyEmail);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/forgotPass").post(forgotPass)
router.route("/resetPass/:token").post(resetPassword)
router.route("/me").get(protect, loadUser);
router.get('/me', protect, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
