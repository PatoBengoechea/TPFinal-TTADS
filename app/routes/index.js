const { Router } = require("express");
const router = Router();

const verifyToken = require("../utilities/validateToken");

// Rutas accesibles
router.use("/authentication", require("./authentication"));

// Rutas Protegidas
router.use("/movie", verifyToken, require("./movie"));
router.use("/actor", verifyToken, require("./actor"));

module.exports = router;
