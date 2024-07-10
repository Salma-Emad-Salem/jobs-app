import { model, Schema, Types } from "mongoose";
import { systemRoles } from "../../src/utils/systemRules.utils.js";

const schema = new Schema({
    companyName:{
                type:String,
                unique:true
            },
    desc:String,
    industry:String,
    address:String,
    numberOfEmployess:Number,
    companyEmail:{
                type:String,
                unique:true
            },
    companyHr:{
                type:Types.ObjectId,
                ref:systemRoles.USER
            }
    },{
        timestamps:{
            createdAt:true,
        },
        versionKey:false
    })

export const Company =model("Company" , schema);