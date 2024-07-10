import Joi from "joi";
import { systemRoles } from "../../utils/systemRules.utils.js";

export const UserJoi = {
    body: Joi.object({
    firstName: Joi.string().min(3).max(12).alphanum().required(),
    lastName: Joi.string().min(3).max(12).alphanum().required(),
    username: Joi.string().min(3).max(30).alphanum().required(),
    email: Joi.string().email().required().required(),
    phone: Joi.string().min(10).max(15).required(),
    recoverEmail:Joi.string().default('recoveryEmail@info').optional(),
    password: Joi.string()
    .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/
    )
    .required()
    .messages({
    "string.pattern.base":
    "Password must have at least one lowercase letter, one uppercase letter, one number and one special character",
    "any.required": "You need to provide a password",
    "string.min": "Password should have a minimum length of 3 characters",
        }),
    role:Joi.string().valid(systemRoles.USER , systemRoles.ADMIN).default(systemRoles.USER).required(),
    status:Joi.string().valid("online","offline").default("offline").required(),
    otp:Joi.string().optional(),
    otpExpiry:Joi.date().optional(),
    })
  };