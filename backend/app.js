const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
require("./config/passport-setup");

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;