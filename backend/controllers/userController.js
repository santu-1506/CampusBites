const User = require("../models/User");
const Canteen = require("../models/Canteen");
const Campus = require("../models/Campus");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, campus } = req.body;
    if (!["student", "canteen"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'student' or 'canteen'." });
    }
    const campusDoc = await Campus.findOne({ name: campus });
    if (!campusDoc) {
      return res.status(400).json({ message: "Campus not found. Please enter a valid campus name." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }
    let newCanteen = null;
    if (role === "canteen") {
      newCanteen = await Canteen.create({
        name: `${name}'s Canteen`,
        campus: campusDoc._id,
        isOpen: true
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
      campus: campusDoc._id,
      canteenId: newCanteen ? newCanteen._id : undefined
    });
    if (newCanteen) {
      newCanteen.owner = user._id;
      await newCanteen.save();
    }
    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      message: "Server error during registration",
      error: error.message
    });
  }
};
