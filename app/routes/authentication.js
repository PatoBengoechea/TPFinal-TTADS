const { Router } = require("express");
const router = Router();

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const colors = require("colors");
const config = require("../utilities/config");
const verifyToken = require("../utilities/validateToken");

/* Register a user */
router.post("/signup", async (req, res) => {
  try {
    // Receiving data
    const { username, email, password } = req.body;

    // Creating new user
    const user = new User({
      username,
      email,
      password
    });

    // Encrypting password
    user.password = await user.encryptPassword(user.password);
    console.log(colors.yellow("Password encrypted"));

    // Saving user
    await user.save();
    console.log(colors.cyan(user));

    // Create a Token
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
    console.log(colors.yellow("Token created"));

    // Configure response to client
    res.json({
      auth: true,
      message: "User created succesfully",
      token
    });
  } catch (error) {
    console.log(colors.red(error));
    res.status(500).send("There was a problem registering your user");
  }
});

/* Log an user */
router.post("/signin", async (req, res) => {
  try {
    // Search for user in DB
    const user = await User.findOne({ email: req.body.email });
    // Validate user existence
    if (!user) {
      return res
        .status(404)
        .json({
          status: true,
          data: null,
          message: "Usuario no encontrado"
        })
    }
    // Validate correct password
    const validatedPassword = await user.comparePassword(req.body.password);

    if (!validatedPassword)
      return res.status(401).json({
        auth: false,
        message: "Wrong password",
        token: null
      });

    // se setea 'id: user._id' pq proviene desde mongodb y si no lo asignamos como objeto no se lee comi json
    const token = jwt.sign({id: user._id}, config.secret, {
      expiresIn: 60 * 60 * 24
    });

    res.json({
      status: true,
      data: {
        auth: true,
        token },
      message: null
      
    });

  } catch (error) {
    console.log(colors.red(error));
    return res
      .status(500)
      .json({status: false, data: null, message: "There was a problem in the singin" });
  }
});

/* Info valid user */
// Ruta protegida
router.get("/info", verifyToken, async (req, res) => {
  try {
    // Search for user in DB
    const user = await User.findById(req.actualUserId, { password: 0 });
    // Validate user
    if (!user)
      return res.sendStatus(404).json({
        auth: true,
        message: "No user found"
      });

    // Configure response to client
    res.json({
      auth: true,
      message: "You are authorized to be here",
      user
    });
  } catch (error) {
    console.log(colors.red(error));
    res
      .status(500)
      .json({ message: "There was a problema with the authorization" });
  }
});


module.exports = router;
