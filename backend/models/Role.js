//const mongoose = require("mongoose");
import mongoose from "mongoose";
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String
  })
);

//module.exports = Role;
export default Role;