const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(con => {
    console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
  }).catch(err => {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  });
};

module.exports = connectDatabase;