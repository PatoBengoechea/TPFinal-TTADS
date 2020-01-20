const mongoose = require("mongoose");
const colors = require("colors");

mongoose
  .connect("mongodb+srv://admin:admin@cluster0-geyoz.mongodb.net/cinema", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(db =>
    console.log(colors.green("Succesfully conected to MongoDB Atlas"))
  )
  .catch(err => console.log(colors.red("Error conecting to DB:", err)));
