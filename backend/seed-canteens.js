const mongoose = require("mongoose");
const Canteen = require("./models/Canteen");
const Campus = require("./models/Campus");
const User = require("./models/User");
require("dotenv").config({ path: "./config/config.env" });

// Sample canteen data
const sampleCanteens = [
  {
    name: "Central Cafeteria",
    cuisine: "Multi-Cuisine",
    rating: 4.5,
    deliveryTime: "15-25 min",
    distance: "Block A",
    featured: true,
    discount: "20% OFF",
    description: "The main dining hub with diverse food options",
    images: ["/placeholder.jpg"],
    isOpen: true
  },
  {
    name: "Snack Shack",
    cuisine: "Fast Food",
    rating: 4.2,
    deliveryTime: "10-15 min",
    distance: "Block B",
    featured: false,
    discount: null,
    description: "Quick bites and snacks for busy students",
    images: ["/placeholder.jpg"],
    isOpen: true
  },
  {
    name: "Healthy Bites",
    cuisine: "Healthy",
    rating: 4.7,
    deliveryTime: "20-30 min",
    distance: "Block C",
    featured: true,
    discount: "15% OFF",
    description: "Fresh salads, smoothies and healthy options",
    images: ["/placeholder.jpg"],
    isOpen: true
  },
  {
    name: "Desi Dhaba",
    cuisine: "Indian",
    rating: 4.3,
    deliveryTime: "25-35 min",
    distance: "Block D",
    featured: false,
    discount: null,
    description: "Authentic Indian flavors and traditional dishes",
    images: ["/placeholder.jpg"],
    isOpen: false
  },
  {
    name: "Pizza Corner",
    cuisine: "Italian",
    rating: 4.6,
    deliveryTime: "20-30 min",
    distance: "Block E",
    featured: true,
    discount: "Buy 1 Get 1",
    description: "Fresh pizzas and Italian delicacies",
    images: ["/placeholder.jpg"],
    isOpen: true
  },
  {
    name: "Coffee & More",
    cuisine: "Beverages",
    rating: 4.4,
    deliveryTime: "5-10 min",
    distance: "Library Block",
    featured: false,
    discount: null,
    description: "Coffee, tea, and light snacks for study sessions",
    images: ["/placeholder.jpg"],
    isOpen: true
  }
];

async function seedCanteens() {
  try {
    // Connect to database
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");

    // Clear existing canteens
    await Canteen.deleteMany({});
    console.log("Cleared existing canteens");

    // Find or create a default campus
    let campus = await Campus.findOne({ name: "Main Campus" });
    if (!campus) {
      campus = await Campus.create({
        name: "Main Campus",
        code: "MC",
        city: "University City"
      });
      console.log("Created default campus");
    }

    // Find or create a default user (owner)
    let owner = await User.findOne({ email: "admin@campusbites.com" });
    if (!owner) {
      owner = await User.create({
        name: "Campus Admin",
        email: "admin@campusbites.com",
        password: "password123", // This should be hashed in production
        role: "canteen",
        campus: campus._id
      });
      console.log("Created default owner");
    }

    // Create canteens with proper references
    const canteensWithRefs = sampleCanteens.map(canteen => ({
      ...canteen,
      campus: campus._id,
      owner: owner._id
    }));

    const createdCanteens = await Canteen.insertMany(canteensWithRefs);
    console.log(`✅ Successfully created ${createdCanteens.length} canteens`);

    // Display created canteens
    createdCanteens.forEach((canteen, index) => {
      console.log(`${index + 1}. ${canteen.name} - ${canteen.cuisine} (${canteen.isOpen ? 'Open' : 'Closed'})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding canteens:", error);
    process.exit(1);
  }
}

// Run the seed function
seedCanteens(); 