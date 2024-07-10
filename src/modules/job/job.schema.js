import Joi from "joi";

export const JobJoi = {
    body: Joi.object({
        jobTitle: Joi.string().min(3).max(30).required(),
        jobLocation:Joi.string().valid("Remotely","On-Site","Hybrid").required(),
        workingTime:Joi.string().valid("Full-Time","Part Time","Contract").required(),
        seniorityLevel:Joi.string().valid("Junior", "Mid-Level", "Senior","Team-Lead"," CTO").required(),
        jobDescription:Joi.string().required(),
        techenicalSkills:Joi.string().required(),
        softSkills:Joi.string().required(),
        addBy:Joi.string().required(),
        
    })
  };
  