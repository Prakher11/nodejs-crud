const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
import User from "../models/User.js"
const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/signup",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/login", controller.signin);

  app.delete('/user/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOneAndDelete({ Id: id }); // Use Id instead of _id

      if(!user){
        return res.sendStatus(404);
      }
      res.json({ user });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  });

app.delete('/users', async (req, res) => {
    try {
        // Logic to delete all users
        await User.deleteMany();
        return res.send('All users deleted');
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
})

app.get('/user', async (req, res) => {
    try {
      const token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, config.secret);
      const userId = decoded.id;
  
      const user = await User.findOne({ Id: userId }).populate("roles", "-__v");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  });

};