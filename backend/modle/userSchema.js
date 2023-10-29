const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blog",
        },
      ],
},
{ timestamps: true }
)

//we are hashing password here
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
})


const User=mongoose.model("USER",userSchema)
module.exports=User;