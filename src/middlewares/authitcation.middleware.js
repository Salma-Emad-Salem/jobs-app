
import jwt from "jsonwebtoken"
import { User } from "../../db/models/userModel.js";

// Configuration (adjust these to your needs)


export const authenticationMiddleware = {

    // Token Generation
    generateToken: (user) => {
        const payload = {
            userId: user._id,
            role: user.role // Include other user data as needed
        };
        return jwt.sign(payload, process.env.SECRET_KEY);
    },

    // Token Verification Middleware
    verifyToken: async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]; // Get token from header

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decoded.userId); // Fetch user from database
            
            if (!user) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            req.user = user; // Attach user to request for later use
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else {
                return res.status(403).json({ message: 'Invalid token' });
            }
        }
    },
}