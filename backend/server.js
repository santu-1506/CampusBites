const dotenv = require("dotenv");
const path = require("path");

// Load environment variables before anything else
dotenv.config({ path: path.join(__dirname, "config/config.env") });

const app = require("./app");
const { connectDB } = require("./config/database");

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is up on port: ${process.env.PORT}`);
});