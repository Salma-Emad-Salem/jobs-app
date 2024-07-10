import { model, Schema, Types } from "mongoose";

const schema = new Schema({
    jobTitle:String,
    jobLocation:{
        type:String,
        enum:["Remotely","On-Site","Hybrid"]
    },
    workingTime:{
        type:String,
        enum:["Full-Time","Part Time","Contract"]
    },
    seniorityLevel:{
        type:String,
        enum:["Junior", "Mid-Level", "Senior","Team-Lead"," CTO"]
    },
    jobDescription:String,
    techenicalSkills:String,
    softSkills:String,
    addBy:{
        type:Types.ObjectId,
        ref:"Company" //companyHrId
    }
})

export const Job =model("Job" , schema)