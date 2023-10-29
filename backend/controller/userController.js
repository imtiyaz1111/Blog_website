const User = require("../modle/userSchema");
const bcrypt=require("bcryptjs")
require("../config/db");

exports.getAllUsers = async(req,res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    else
    {
      return res.status(200).send({
        userCount: users.length,
        success: true,
        message: "all users data",
        users,
      });
    }
   
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};

exports.registerController = async (req,res) => {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      return res.status(422).json({ error: "Please fill the all box" });
    }
    const userName = await User.findOne({ username: username });
    if (userName) {
      return res.status(422).json({ error: "userName already Exist" });
    } else {
      const user = new User({ name, username, password });
      // here is hashing
      const userResgister = await user.save();
      if (userResgister) {
        res.status(202).json({ message: "user register successfully" });
      } else {
        res.status(500).json({ error: "Faild Register" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginController = async (req,res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Please filled the data" });
    }
    const userLogin = await User.findOne({ username: username });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        return res.status(400).json({ error: "failed to login" });
      } else {
        return res.status(202).json({ message: "login successfully", userLogin });
      }
    } else {
      return res.status(400).json({ error: "failed to login" });
    }
  } catch (error) {
    console.log(error);
  }
};
