import Joi from "joi";

export const CompanyJoi={
    body:Joi.object({

        companyName:Joi.string().min(3).max(30).required(),
        desc:Joi.string().min(3).max(30).required(),
        industry:Joi.string().min(3).max(30).required(),
        address:Joi.string().min(3).max(200).required(),
        numberOfEmployess:Joi.number().min(3).required(),
        companyEmail:Joi.string().email().required(),
        companyHr:Joi.string().required(),

    
    })
}