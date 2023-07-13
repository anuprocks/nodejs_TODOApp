import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"
import ErrorHandler from "../middlewares/error.js";

export const register =  async(req, res) => {
    try {
        const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user) 
        return next(new ErrorHandler("User already Exist",400));
        
    //else
    const hashedPassword = await bcrypt.hash(password,10);
    user = await User.create({name,email,password:hashedPassword});

    sendCookie(user,res,"registered succesfully",201);
    } catch (error) {
        next(error)
    }
    
};

export const login =  async(req, res) => {
    try {
        const {email,password} = req.body;
    const user = await User.findOne({email}).select("+password");
    //if the user doesn't exits
    if(!user) 
        return next(new ErrorHandler("invalid email or password",400));
    //if password of the user matches
    const isMatch = await bcrypt.compare(password,user.password);
    //if the password doesn't matches
    if(!isMatch) 
        return next(new ErrorHandler("invalid email or password",400));

    sendCookie(user,res,`hi,${user.name}`,200)
    } catch (error) {
        next(error)
    }

};

export const logout = (req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development" ? "lax":"none",
        secure:process.env.NODE_ENV==="Development" ? false:true,
    })
    .json({
        success:true,
        user:req.user,
    });
}

export const getMyProfile = (req,res)=>{
        res.status(200).json({
            success:true,
            user:req.user,
        });
}





// export const specialFunc = async(req,res)=>{
//     // const {id} = req.params;
//     res.json({
//         success:true,
//        message:"you are special",
//     });
// }

// export const updateUser = async(req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);
//     res.json({
//         success:true,
//         message:"updated",
//     });
// }
// export const deleteUser = async(req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);
//     await user.deleteOne();
//     res.json({
//         success:true,
//         message:"deleted",
//     });
// }