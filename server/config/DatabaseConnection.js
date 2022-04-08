const mongoose = require("mongoose");
const db = `${process.env.DB_URL}`;
async function connectDB() {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("Database Connected Successfully");
  } catch (err) {
  }
}
module.exports = connectDB;
