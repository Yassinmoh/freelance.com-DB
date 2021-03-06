const mongoose = require("mongoose");
// const mongoose_delete = require('mongoose-delete');
const skills = require("./Skill");

const UserSchema = mongoose.Schema({
  userName: { type: String, unique: true },
  Email: { type: String, required: true, unique: true },
  Phone: { type: Number, min: 10 },
  Password: { type: String, required: true },
  Image: { type: String },
  Rating: { type: String },
  typeUser: { type: String, default: "user" },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  whatDo: { type: String, default: null, minLength: 10 },
  Description: { type: String, default: null, minLength: 100 },
  Language: { type: String, default: null },
  dateOfBirth: { type: Date, default: null },
  linkAcount: { type: String, default: null },
  acountType: { type: String, default: null },
  Address: { type: String },
  City: { type: String },
  State: { type: String },
  zipCode: { type: String },
  Country: { type: String },
  projectid: [{ type: mongoose.Schema.Types.ObjectId }],
  skills: [{ type: mongoose.Schema.Types.ObjectId }],
  deleted: { type: Boolean, default: false }
});



module.exports = mongoose.model("users", UserSchema);
