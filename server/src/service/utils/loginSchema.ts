import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().max(150).trim().lowercase().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .required()
    .messages({
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    }),
});
