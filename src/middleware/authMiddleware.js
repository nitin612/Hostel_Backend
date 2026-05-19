import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid or expired token.", error: error.message });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.member_type === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required." });
  }
};

export { protect, authorizeAdmin };

