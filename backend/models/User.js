import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
 Id: {
    type: String,
    default: uuidv4,
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
}, {
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret.Id; // Rename 'Id' field to 'id'
      delete ret._id;
      delete ret.Id;
    },
  },
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('User', userSchema);

export default User;