const userModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = `${process.env.JWT_SECRET_KEY}`;

const UserControllers = {
  register: async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let contactnumber = req.body.contactnumber;
    let password = req.body.password;
    const passwordHash = await bcrypt.hash(password, 10);
    let ins = new userModel({
      username: username,
      email: email,
      contactnumber: contactnumber,
      password: passwordHash,
    });
    const user = await userModel.findOne({ email: email });
    const users = await userModel.findOne({username:username})
    if (user) {
      res.send({ error: "User Email Already Exists" });
    } else if(users){
      res.send({ error: "Username Already Exists" });
    } 
    else {
      ins.save((error) => {
        if (error) {
          throw error;
        } else {
          res.send({ msg: "Registered Successfully" });
        }
      });
    }
  },
  login: async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    const data = await userModel.findOne({ email: email });
    if (data) {
      const validPassword = await bcrypt.compare(password, data.password);
      if (validPassword) {
        let payload = { uid: email };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
        res.send({ msg: "Login Successful", token: token, data: data });
      } else {
        res.send({ error: "Password doesn't match" });
      }
    } else {
      res.send({ error: "User Not Registered" });
    }
  },
};
module.exports = UserControllers;
