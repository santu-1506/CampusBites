const dotenv = require("dotenv");
const path = require("path");

// Load environment variables before anything else
dotenv.config({ path: path.join(__dirname, "config/config.env") });

console.log("🚀 Starting CampusBites backend server...");

const app = require("./app");
const connectDatabase = require('./config/database');

// Load models to ensure they're registered
const Canteen = require('./models/Canteen');
const Campus = require('./models/Campus');
const User = require('./models/User');
const Item = require('./models/Item');
const Menu = require('./models/Menu');
const Notification = require('./models/Notification');
const Order = require('./models/Order');
const Review = require('./models/Review');
const Transaction = require('./models/Transaction');

console.log("📦 All models loaded successfully");

// Connect to the database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  console.log(`🌐 API available at: http://localhost:${process.env.PORT}/api/v1/canteens`);
});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`❌ ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
});

// Handle process termination gracefully
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Process terminated');
    });
});

process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('✅ Process terminated');
    });
});