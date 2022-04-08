const express = require("express")
const cors = require("cors");
const port =  8000;
const app = express();
const path = require("path")
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const connectDB = require("./config/DatabaseConnection")
connectDB();

const UserRouter = require("./routes/UserRoutes");
app.use("/api/cv",UserRouter);

app.listen(port,(error) => {
    if(error) throw error;
    console.log(`Server is Working on ${port}`);
})