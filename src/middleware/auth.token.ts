import { Request, Response } from "express";

const jwt = require("jsonwebtoken");
const config = process.env;

export function verifyToken(req: Request, res: Response, next: any) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.header = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
}
