const { Router } = require("express");
const router = Router();

const verifyToken = require("../utilities/validateToken");

// Rutas accesibles
router.use("/api/authentication", require("./authentication"));

// Rutas Protegidas
router.use("/api/movie", verifyToken, require("./movie"));
router.use("/api/actor", verifyToken, require("./actor"));

module.exports = router;
