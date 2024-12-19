import jwt from "jsonwebtoken";
import { UserModel } from "../features/user/user.repository.js";

const jwtAuthentication = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Unauthorized.");
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET || "7wIkbuSRPvlwAhqBY5wQ3PmdYp0tOS3v"
    );
    const user = await UserModel.findOne({ _id: payload.userId });

    // Ensure the token is in the user's token array
    if (!user || !user.tokens.includes(token)) {
      return res.status(401).send("Unauthorized.");
    }

    req.userId = payload.userId;
  } catch (error) {
    return res.status(401).send("Unauthorized.");
  }
  next();
};

export default jwtAuthentication;
