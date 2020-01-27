const jwt = require("jsonwebtoken");
const config = require("../utilities/config");
const colors = require("colors");

function verifyToken(req, res, next) {
  try {
    // Verificar existencia de la cabecera del token
    if (!req.headers.authorization)
      return res.status(401).json({
        auth: false,
        message: "No token provided"
      });

    // Verificar que el token no este vacio
    const token = req.headers.authorization.split(" ")[1];
    if (token === null)
      return res.status(401).json({
        auth: false,
        message: "No token provided"
      });

    // Decode token
    const payload = jwt.verify(token, config.secret);

    // Setear parametro que se pasara a traves de toda la sesion
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({
      auth: false,
      error: error
    });
  }
}

module.exports = verifyToken;
