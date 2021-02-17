const express = require("express");
const constants = require("./constants");
const mongoose = require("mongoose");
const AuthController = require("./Authcontroller");
const UserController = require("./UserController");
const bodyParser = require("body-parser");
//ye ejs include krne ke lye to run css file in backen
//ejs should go insude views file its file with signin.ejs
const engine = require("ejs-mate");
// const middleware = require("./middleware");

const app = express();
//ye three line copy as it is to use ejs
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());
//post request maarte time form se ye krna pdhta hai
const urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.connect(constants.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/register", (req, res) => {
  res.render("signup.ejs");
});
//idhar bh urlencoder parser add krna pdhta hai
app.post("/register", urlencodedParser, AuthController.register);

app.get("/login", (req, res) => {
  res.render("signin.ejs");
});

app.post("/login", urlencodedParser, AuthController.login);
// app.post("/login", AuthController.login);
// app.get("/user/:id", UserController.user);
// app.get("/users/:id", middleware.checkAuth, UserController.user);

app.listen(constants.PORT, () => {
  console.log("server is listening");
});
