import jwt from "jsonwebtoken";
import env from "./configs";

export const generateToken = (
  userId: number | string,
  role: string,
): string => {
  return jwt.sign({ userId, role }, env.jwtSecret, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (
  userId: number | string,
  role: string,
): string => {
  return jwt.sign({ userId, role }, env.jwtRefreshSecret, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.jwtRefreshSecret);
};
