import { ErrorClass } from "../utils/errorClass.utils.js"; // Assuming your custom error class

// Error handling middleware
export const errorHandler = (API) => {
  return async (req, res, next) => {
    try {
      await API(req, res, next);
    } catch (err) {
      // Log the error for debugging
      console.error("Error in async handler scope:", err); // Log the entire error object

      // Determine appropriate status code based on error type
      const statusCode = err instanceof ErrorClass ? err.statusCode : 500; // Customize this based on your ErrorClass implementation
      const errorMessage = err instanceof ErrorClass ? err.message : "Internal Server Error"; // Customize this based on your ErrorClass implementation

      // Create structured error response
      const errorResponse = {
        message: "Fail response",
        error: errorMessage,
        ...(err instanceof ErrorClass && {
          // If it's a custom ErrorClass, include additional details
          location: err.location,
          data: err.data
        }),
      };

      res.status(statusCode).json(errorResponse);
    }
  };
};

// Global error handler
export const globalErrorHandler = (err, req, res, next) => {
  // Log the error for monitoring/alerting
  console.error("Global error handler:", err);

  // Sanitize error details for production environments
  const errorResponse = process.env.NODE_ENV === "production"
    ? { message: "Internal Server Error" }
    : { message: err.message, stack: err.stack }; // Include stack trace in development

  res.status(err.statusCode || 500).json(errorResponse);
};
