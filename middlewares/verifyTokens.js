const jwt = require("jsonwebtoken");
module.exports = function verifyTokens(req, res, next) {
  console.log("Middleware is running");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    console.log("✅ Token decoded:", user);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
