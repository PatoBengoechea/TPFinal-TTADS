const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const colors = require("colors");

const userSchema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: "user"
  }
);

userSchema.methods.encryptPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (error) {
    console.log(colors.red("Error while encrypting password: ", error));
  }
};

// No se usa funcion => pq se requiere usar 'this.password'
// en referencia al userSchema
userSchema.methods.comparePassword = async function(password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(colors.red("Error while comparing passwords:", error));
  }
};

module.exports = model("User", userSchema);
