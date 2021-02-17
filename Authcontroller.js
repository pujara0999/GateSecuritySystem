const UserModel = require("./models/patients");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    let {
      name,
      email,
      password,
      sex,
      dob,
      age,
      blood_group,
      emergency
    } = req.body;
    let apos = email.indexOf("@");
    let dotpos = email.indexOf(".");
    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !apos ||
      !dotpos ||
      apos < 1 ||
      dotpos - apos < 2 ||
      password.length < 3 ||
      email.trim() == ""
    ) {
      res.send(422);
      return;
    }
    password = bcrypt.hashSync(password, 10);

    let user = new UserModel({
      name,
      email,
      password,
      sex,
      dob,
      age,
      blood_group,
      emergency
    });
    user.save((err, obj) => {
      if (err) {
        res.status(500);
        res.send();
        return;
      }
      console.log(obj);
    });
  },
  login: (req, res) => {
    let { _id, password } = req.body;
    UserModel.findOne(
      {
        _id
      },
      (err, result) => {
        if (err) {
          res.status(500);
          res.send();
          return;
        }
        if (!result) {
          res.status(401);
          res.render("signin.ejs", { message: "Wrong Input or Password" });
          return;
        }
        if (bcrypt.compareSync(password, result.password)) {
          console.log(result);
          res.render("pers_info.ejs", { result });
        }
      }
    );
  }
};
