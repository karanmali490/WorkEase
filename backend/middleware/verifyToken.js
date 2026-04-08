const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // 🔴 Check header exists
    if (!authHeader) {
      return res.status(401).json({ message: "No Authorization header" });
    }

    // 🔴 Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    // 🔴 Verify token using ENV secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user data
    req.user = decoded;

    next();

  } catch (err) {

    // 🔴 Token expired
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }

    // 🔴 Invalid token
    return res.status(401).json({ message: "Invalid Token" });
  }
};