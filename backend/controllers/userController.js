import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const register = async (req, res) => {
    try {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        return res.status(409).json({ message: 'Username already exists.' });
      }
  
      const newUser = new User(req.body);
      newUser.password = bcrypt.hashSync(req.body.password, 10);
      const user = await newUser.save();
      user.password = undefined;
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

const sign_in = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }

    // Set req.user with the authenticated user
    req.user = user;

    return res.json({ token: jwt.sign({ username: user.username, id: user.id }, 'RESTFULAPIs') });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const loginRequired = (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};

const profile = (req, res, next) => {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default {
  register,
  sign_in,
  loginRequired,
  profile
};
