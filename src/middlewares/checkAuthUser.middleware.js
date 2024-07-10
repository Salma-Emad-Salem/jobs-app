import bcrypt from "bcrypt"
import { User } from "../../db/models/userModel.js"
export const checkEmailOrPhone=async(req,res,next)=>{
    
    //let find email
    let isEmail = await User.findOne({email:req.body.email})
    if(isEmail) return res.status(409).json({message:"Email already exists"})

    //let find phone
    let isPhone =await User.findOne({phone:req.body.phone})
    if(isPhone) return res.status(409).json({message:"Phone already exists"})

    //hash password
    req.body.password = bcrypt.hashSync(req.body.password , process.env.HASH_PASS )

    next()
}




