import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../model/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (error, jwtResponse) => {
          if (error) {
            return res.status(401).json({ message: error.message });
          } else {
            return jwtResponse;
          }
        }
      );
      //get user
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized User" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Unauthorized , No Token" });
  }
};
