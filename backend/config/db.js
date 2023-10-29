const mongoose=require("mongoose")
const DB=process.env.DATABASE

const connectToDb=async  ()=>{
    mongoose.connect(DB)
    .then(()=>{
        console.log("connection successfully");
    })
    .catch((err)=>{
        console.log(err.message)
    })
}

module.exports=connectToDb;