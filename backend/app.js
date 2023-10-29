require('dotenv').config();
const express=require("express");
const connectToDb=require("./config/db")
const app=express()
const cors=require("cors")
const bodyParser=require("body-parser")
const PORT=process.env.PORT || 7000

//router import
const userRoutes = require("./router/userRoute");
const blogRoutes = require("./router/blogRoute");

//mongodb connection
connectToDb();

//middelwares
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.listen(PORT,()=>{
    console.log(`port no listening on ${PORT}`)
})