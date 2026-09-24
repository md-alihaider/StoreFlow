import { readAccessToken } from "../utils/auth.utils.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access token not found in the request header",
    });
  }

  const [schema, accessToken] = authHeader.split(" ");

  if (schema !== "Bearer" || !accessToken) {
    return res.status(401).json({
      message: "Invalid authorization header",
    });
  }

  try {
    const decoded = readAccessToken(accessToken);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired accesss token",
    });
  }
};
