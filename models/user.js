import mongoose from "mongoose";
//dchmea
const schema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        select:false,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
   
})
//model
export const User = mongoose.model("User",schema);