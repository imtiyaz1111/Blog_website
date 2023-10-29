const express=require("express");
const { registerController, loginController,getAllUsers} = require("../controller/userController");
const router=express.Router()

router.get("/all-user",getAllUsers)
router.post("/register",registerController);
router.post("/login",loginController)

module.exports=router