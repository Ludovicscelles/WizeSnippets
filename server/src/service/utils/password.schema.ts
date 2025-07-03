import Joi from "joi";

export const passwordRule = Joi.string()
  .min(8)
  .max(64)
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).+$/
  )
  .messages({
    "string.min": "Le mot de passe doit contenir au moins 8 caractères",
    "string.max": "Le mot de passe ne doit pas dépasser 64 caractères",
    "string.pattern.base":
      "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial",
  });
