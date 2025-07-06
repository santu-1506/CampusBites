const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require('passport');
require('./config/passport');

const userRoutes = require("./routes/userRoutes");
const canteenRoutes = require("./routes/canteenRoutes");
const campusRoutes = require("./routes/campusRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require('./routes/orderRoutes');
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// API routes
app.use("/api/users", userRoutes);
app.use("/api/canteens", canteenRoutes);
app.use("/api/campuses", campusRoutes);
app.use("/api/menu", menuRoutes);
app.use('/api/orders', orderRoutes);

// Google OAuth routes
app.get('/api/auth/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));
app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // req.user contains the JWT token
    const token = req.user;
    // Redirect back to frontend with token
    res.redirect(`${process.env.FRONTEND_HOST}/login?token=${token}`);
  }
);

// Health check
app.get("/", (req, res) => {
    res.send("Campus Bites API is running 🚀");
});

app.get('/health', (req, res) => res.send('OK'));

// 404 fallback
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

module.exports = app;
