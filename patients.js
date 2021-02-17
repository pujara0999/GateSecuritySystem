const mongoose = require("mongoose");
const constants = require("../constants");
// const jwt = require("jsonwebtoken");

const ptnSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  sex: String,
  dob: String,
  age: Number,
  blood_group: String,
  emergency: Number,
  prev_apntmts: [
    {
      doctor: String,
      disease: String,
      date: String
    }
  ]
});
// userSchema.methods.generateJwtToken = _id => {
//     const token = jwt.sign({
//             _id: this._id
//         },
//         constants.JWT_SECRET
//     );
//     return token;
// };

const ptnModel = mongoose.model("patient", ptnSchema);
module.exports = ptnModel;
