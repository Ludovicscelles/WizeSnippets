import { RequestHandler } from "express";
import { ObjectSchema } from "joi";

export const validateSchema = (schema: ObjectSchema): RequestHandler => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true, 
    });

    if (error) {
      res.status(400).json({
        errors: error.details.map((detail) => ({
          message: detail.message,
          path: detail.path.join("."),
        })),
      });
      return;
    }

    req.body = value; 
    next();
  };
};
