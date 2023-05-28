const mongoose = require("mongoose");
import { v4 as uuidv4 } from "uuid";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    Id: {
            type: String,
            default: uuidv4,
            unique: true
        }
    ,
    Username: String,
    Password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;