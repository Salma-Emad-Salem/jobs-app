import { systemRoles } from "../utils/systemRules.utils.js";

  
// Middleware to check for Company_HR role
const isCompanyHR = (req, res, next) => {
    if (req.user.role === systemRoles.ADMIN) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };

  
  
  // Middleware to check for User or Company_HR role
  const isUserOrCompanyHR = (req, res, next) => {
    if (req.user.role === systemRoles.USER || req.user.role === systemRoles.ADMIN) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
  
  // Middleware to check for User role
  const isUser = (req, res, next) => {
    if (req.user.role === systemRoles.USER) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
  export{
    isUser,
    isUserOrCompanyHR,
    isCompanyHR
  }
  