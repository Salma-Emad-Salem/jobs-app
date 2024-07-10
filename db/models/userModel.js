import { model, Schema, Types } from "mongoose";
import { systemRoles } from "../../src/utils/systemRules.utils.js";

const schema =new Schema({
    firstName:String,
    lastName:String,
    username:String,
    email:{
                type:String,
                unique:true
                },
    phone:{
                type:String,
                unique:true
                },
    recoverEmail:{
                type:String,
                default:"recoveryEmail@info",
                unique:false
                },
    password:{
                type:String,
                require:true
    },
    role:{
                type:String,
                enum:[systemRoles],
                default:systemRoles.USER,
                require:true  
                },
    status:{
                type:String,
                enum:["online","offline"],
                default:"offline"

                },
    otp: String, // One-Time Password (for password recovery)
    otpExpiry: Date
},{
    timestamps:{createdAt:false},
    versionKey:false
})

export const User = model('User' , schema);