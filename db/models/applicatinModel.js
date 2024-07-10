
import { model, Schema, Types } from "mongoose";
import { systemRoles } from "../../src/utils/systemRules.utils.js";
const schema =new Schema({
    jobId:{
        type:Types.ObjectId,
        ref:"Job"
    },
    userId:{
        type:Types.ObjectId,
        ref:systemRoles.USER
    },
    userTechSkills:String,
    userSoftSkills:String,
    userResume:String
})

export const Application =model("Application" , schema);