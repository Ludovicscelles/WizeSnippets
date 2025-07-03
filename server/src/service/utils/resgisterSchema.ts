import Joi from "joi";
import { passwordRule } from "./password.schema";
 

export const registerSchema = Joi.object({
  pseudo: Joi.string().min(3).max(30).required().messages({
    "string.min": "Pseudo must be at least 3 characters long",
    "string.max": "Pseudo must not exceed 30 characters",
    "any.required": "Pseudo is required",
  }),
  firstname: Joi.string().min(1).max(60).required().messages({
    "string.min": "Firstname must be at least 1 character long",
    "string.max": "Firstname must not exceed 60 characters",
    "any.required": "Firstname is required",
  }),
  lastname: Joi.string().min(1).max(60).required().messages({
    "string.min": "Lastname must be at least 1 character long",
    "string.max": "Lastname must not exceed 60 characters",
    "any.required": "Lastname is required",
  }),
  email: Joi.string().email().max(150).required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: passwordRule.required().messages({
    "any.required": "Password is required",
  }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm Password must match Password",
      "any.required": "Confirm Password is required",
    }),
});