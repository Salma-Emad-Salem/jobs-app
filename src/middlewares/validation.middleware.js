import { ErrorClass } from "../utils/errorClass.utils.js";


/**
 * @param {object} schema - Joi schema object
 * @returns  {Function} - Middleware function
 * @description - Middleware function to validate the request data against the schema
*/

const reqKeys = ["body", "query", "params", "headers"];

export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const validationErrors = [];

    for (const key of reqKeys) {
      const validationResult = schema[key]?.validate(req[key], { abortEarly: false });

      if (validationResult?.error) {
        // Extract and format error messages
        const formattedErrors = validationResult.error.details.map(detail => ({
          field: detail.path[0],  // Get the field name
          message: detail.message,
        }));

        validationErrors.push(...formattedErrors); // Use spread syntax to add individual errors to the array
      }
    }

    if (validationErrors.length > 0) {
      next(new ErrorClass("Validation Error", 400, validationErrors));
    } else {
      next(err);
    }
  };
};
