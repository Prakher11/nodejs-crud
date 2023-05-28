//const mongoose = require('mongoose');
import mongoose from "mongoose";
import User from "./User.js";
import Role from "./Role.js";
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;

db.ROLES = ["user"];

//module.exports = db;
export default db;