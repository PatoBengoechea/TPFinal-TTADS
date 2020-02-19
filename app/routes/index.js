const { Router } = require("express");
const router = Router();

const verifyToken = require("../utilities/validateToken");

// Rutas accesibles
router.use("/authentication", require("./authentication"));
router.use("/movie", require("./movie"));

// Rutas Protegidas
router.use("/actor", verifyToken, require("./actor"));

module.exports = router;
