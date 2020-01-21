const jwt = require("jsonwebtoken");
const config = require("../utilities/config");

function verifyToken(req, res, next) {
  try {
    // Recive token from client
    const token = req.headers["x-access-token"];
    // Validate token existence
    if (!token)
      return res.status(401).json({
        auth: false,
        message: "No token provided"
      });

    // Decode token
    const tokenDecoded = jwt.verify(token, config.secret);

    // Setear parametro que se pasara a traves de toda la sesion
    req.actualUserId = tokenDecoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      auth: false,
      error
    });
  }
}

module.exports = verifyToken;
