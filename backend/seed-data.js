const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config/config.env") });

const connectDatabase = require("./config/database");
const Campus = require("./models/Campus");
const Canteen = require("./models/Canteen");
const Item = require("./models/Item");
const Menu = require("./models/Menu");

const seedData = async () => {
  try {
    console.log("🌱 Starting database seeding...");
    await connectDatabase();
    
    // Clear existing data
    await Item.deleteMany({});
    await Menu.deleteMany({});
    await Canteen.deleteMany({});
    
    // Get or create default campus
    let campus = await Campus.findOne();
    if (!campus) {
      campus = new Campus({
        name: "Main Campus",
        code: "MAIN001",
        city: "Delhi"
      });
      await campus.save();
      console.log("✅ Default campus created");
    }
    
    // Create sample canteens
    const canteens = [
      {
        name: "Burger Junction",
        cuisine: "Fast Food",
        campus: campus._id,
        isOpen: true,
      },
      {
        name: "Pizza Palace",
        cuisine: "Italian",
        campus: campus._id,
        isOpen: true,
      },
      {
        name: "Healthy Bites",
        cuisine: "Health Food",
        campus: campus._id,
        isOpen: true,
      },
      {
        name: "Spice Garden",
        cuisine: "Indian",
        campus: campus._id,
        isOpen: true,
      },
      {
        name: "Coffee Corner",
        cuisine: "Beverages",
        campus: campus._id,
        isOpen: false,
      }
    ];
    
    const createdCanteens = await Canteen.insertMany(canteens);
    console.log("✅ Sample canteens created");
    
    // Create menus for each canteen
    const menuItems = [];
    
    // Burger Junction items
    const burgerMenu = new Menu({
      canteen: createdCanteens[0]._id,
      name: "Burger Junction Menu"
    });
    await burgerMenu.save();
    
    const burgerItems = [
      { name: "Classic Burger", price: 199, category: "Burgers", isVeg: false, canteen: createdCanteens[0]._id, menu: burgerMenu._id },
      { name: "Veggie Burger", price: 179, category: "Burgers", isVeg: true, canteen: createdCanteens[0]._id, menu: burgerMenu._id },
      { name: "Chicken Burger", price: 229, category: "Burgers", isVeg: false, canteen: createdCanteens[0]._id, menu: burgerMenu._id },
      { name: "French Fries", price: 89, category: "Sides", isVeg: true, canteen: createdCanteens[0]._id, menu: burgerMenu._id },
      { name: "Onion Rings", price: 99, category: "Sides", isVeg: true, canteen: createdCanteens[0]._id, menu: burgerMenu._id },
      { name: "Chocolate Shake", price: 129, category: "Beverages", isVeg: true, canteen: createdCanteens[0]._id, menu: burgerMenu._id }
    ];
    
    // Pizza Palace items
    const pizzaMenu = new Menu({
      canteen: createdCanteens[1]._id,
      name: "Pizza Palace Menu"
    });
    await pizzaMenu.save();
    
    const pizzaItems = [
      { name: "Margherita Pizza", price: 249, category: "Pizza", isVeg: true, canteen: createdCanteens[1]._id, menu: pizzaMenu._id },
      { name: "Pepperoni Pizza", price: 299, category: "Pizza", isVeg: false, canteen: createdCanteens[1]._id, menu: pizzaMenu._id },
      { name: "Veggie Supreme", price: 279, category: "Pizza", isVeg: true, canteen: createdCanteens[1]._id, menu: pizzaMenu._id },
      { name: "Chicken BBQ", price: 329, category: "Pizza", isVeg: false, canteen: createdCanteens[1]._id, menu: pizzaMenu._id },
      { name: "Garlic Bread", price: 149, category: "Sides", isVeg: true, canteen: createdCanteens[1]._id, menu: pizzaMenu._id },
      { name: "Cheesy Dip", price: 79, category: "Sides", isVeg: true, canteen: createdCanteens[1]._id, menu: pizzaMenu._id }
    ];
    
    // Healthy Bites items
    const healthyMenu = new Menu({
      canteen: createdCanteens[2]._id,
      name: "Healthy Bites Menu"
    });
    await healthyMenu.save();
    
    const healthyItems = [
      { name: "Quinoa Salad", price: 199, category: "Salads", isVeg: true, canteen: createdCanteens[2]._id, menu: healthyMenu._id },
      { name: "Grilled Chicken Salad", price: 249, category: "Salads", isVeg: false, canteen: createdCanteens[2]._id, menu: healthyMenu._id },
      { name: "Avocado Toast", price: 179, category: "Healthy", isVeg: true, canteen: createdCanteens[2]._id, menu: healthyMenu._id },
      { name: "Protein Smoothie", price: 159, category: "Beverages", isVeg: true, canteen: createdCanteens[2]._id, menu: healthyMenu._id },
      { name: "Fruit Bowl", price: 129, category: "Healthy", isVeg: true, canteen: createdCanteens[2]._id, menu: healthyMenu._id },
      { name: "Green Juice", price: 149, category: "Beverages", isVeg: true, canteen: createdCanteens[2]._id, menu: healthyMenu._id }
    ];
    
    // Spice Garden items
    const spiceMenu = new Menu({
      canteen: createdCanteens[3]._id,
      name: "Spice Garden Menu"
    });
    await spiceMenu.save();
    
    const spiceItems = [
      { name: "Butter Chicken", price: 299, category: "Main Course", isVeg: false, canteen: createdCanteens[3]._id, menu: spiceMenu._id },
      { name: "Paneer Tikka", price: 249, category: "Main Course", isVeg: true, canteen: createdCanteens[3]._id, menu: spiceMenu._id },
      { name: "Biryani", price: 279, category: "Rice", isVeg: false, canteen: createdCanteens[3]._id, menu: spiceMenu._id },
      { name: "Naan", price: 49, category: "Bread", isVeg: true, canteen: createdCanteens[3]._id, menu: spiceMenu._id },
      { name: "Dal Makhani", price: 179, category: "Main Course", isVeg: true, canteen: createdCanteens[3]._id, menu: spiceMenu._id },
      { name: "Mango Lassi", price: 89, category: "Beverages", isVeg: true, canteen: createdCanteens[3]._id, menu: spiceMenu._id }
    ];
    
    // Coffee Corner items
    const coffeeMenu = new Menu({
      canteen: createdCanteens[4]._id,
      name: "Coffee Corner Menu"
    });
    await coffeeMenu.save();
    
    const coffeeItems = [
      { name: "Espresso", price: 79, category: "Coffee", isVeg: true, canteen: createdCanteens[4]._id, menu: coffeeMenu._id },
      { name: "Cappuccino", price: 129, category: "Coffee", isVeg: true, canteen: createdCanteens[4]._id, menu: coffeeMenu._id },
      { name: "Latte", price: 149, category: "Coffee", isVeg: true, canteen: createdCanteens[4]._id, menu: coffeeMenu._id },
      { name: "Americano", price: 99, category: "Coffee", isVeg: true, canteen: createdCanteens[4]._id, menu: coffeeMenu._id },
      { name: "Croissant", price: 79, category: "Pastry", isVeg: true, canteen: createdCanteens[4]._id, menu: coffeeMenu._id },
      { name: "Chocolate Muffin", price: 89, category: "Pastry", isVeg: true, canteen: createdCanteens[4]._id, menu: coffeeMenu._id }
    ];
    
    // Insert all items
    const allItems = [...burgerItems, ...pizzaItems, ...healthyItems, ...spiceItems, ...coffeeItems];
    await Item.insertMany(allItems);
    
    console.log("✅ Sample menu items created");
    console.log(`📊 Created ${createdCanteens.length} canteens and ${allItems.length} menu items`);
    console.log("🎉 Database seeding completed successfully!");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData(); 