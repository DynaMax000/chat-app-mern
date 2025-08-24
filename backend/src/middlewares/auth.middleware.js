import jwt from 'jsonwebtoken';
import userModel from '../models/User.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const isTokenError = err?.name === 'JsonWebTokenError' || err?.name === 'TokenExpiredError';
      if (isTokenError) {
        return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
      }
      throw err;
    }
    // if (!decoded) {
    //   return res.status(401).json({ message: "Unauthorized - Invalid token" });
    // }

    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  }
  catch (error) {
    console.log("Error in protectRoute middleware:", error);
  res.status(500).json({ message: "Internal Server Error" });
  }
}