const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

const { connectDB } = require("./config/database");
const Campus = require("./models/Campus");

const setupDefaultData = async () => {
  try {
    await connectDB();
    
    // Check if campus already exists
    const existingCampus = await Campus.findOne();
    if (!existingCampus) {
      const defaultCampus = new Campus({
        name: "Main Campus",
        code: "MAIN001",
        city: "Delhi"
      });
      
      await defaultCampus.save();
      console.log("✅ Default campus created successfully");
    } else {
      console.log("✅ Campus already exists");
    }
    
    console.log("✅ Setup completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  }
};

setupDefaultData(); 