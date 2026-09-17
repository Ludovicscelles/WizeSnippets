import Joi from "joi";

export const createSnippetSchema = Joi.object({
  title: Joi.string().trim().min(1).max(150).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 1 character long",
    "string.max": "Title cannot exceed 150 characters",
    "any.required": "Title is required",
  }),

  code: Joi.string().trim().min(1).max(5000).required().messages({
    "string.base": "Code must be a string",
    "string.empty": "Code cannot be empty",
    "string.min": "Code must be at least 1 character long",
    "string.max": "Code cannot exceed 5000 characters",
    "any.required": "Code is required",
  }),

  message: Joi.string().trim().min(1).max(5000).required().messages({
    "string.base": "Message must be a string",
    "string.empty": "Message cannot be empty",
    "string.min": "Message must be at least 1 character long",
    "string.max": "Message cannot exceed 5000 characters",
    "any.required": "Message is required",
  }),

  languageId: Joi.number().integer().positive().required().messages({
    "number.base": "Language ID must be a number",
    "number.integer": "Language ID must be an integer",
    "number.positive": "Language ID must be a positive number",
    "any.required": "Language ID is required",
  }),
});
