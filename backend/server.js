const app = require("./app");
const dotenv = require("dotenv");
const {connectDB} = require("./config/database");

//Load env
dotenv.config({ path: './config/config.env' });

//Connect to DB
connectDB();

//Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is up on port: ${PORT}`);
})