import Joi from "joi";

export const createCommentSchema = Joi.object({
  suggestedCode: Joi.string().trim().min(1).max(5000).required().messages({
    "string.base": "Suggested code must be a string",
    "string.empty": "Suggested code cannot be empty",
    "string.min": "Suggested code must be at least 1 character long",
    "string.max": "Suggested code cannot exceed 5000 characters",
    "any.required": "Suggested code is required",
  }),

  message: Joi.string().trim().min(1).max(5000).required().messages({
    "string.base": "Message must be a string",
    "string.empty": "Message cannot be empty",
    "string.min": "Message must be at least 1 character long",
    "string.max": "Message cannot exceed 5000 characters",
    "any.required": "Message is required",
  }),
});
