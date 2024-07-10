import Joi from "joi";

export const ApplicationJoi ={

    body:Joi.object({
        jobId:Joi.string().required(),
        userId:Joi.string().required(),
        userTechSkills:Joi.string().required(),
        userSoftSkills:Joi.string().required(),

    })
    
    
}