import { Router } from "express";
import Item from "../models/Item.js";
import User from "../models/User.js";
import userHandlers from '../controllers/userController.js';

const router = Router();

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ items });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.post('/items', async (req, res) => {
  try {
    const { Name, Price } = req.body;
    let item = await Item.findOne({ Name });

    if (item) {
      return res.json({ item });
    } else {
      item = await Item.create({
        Name,
        Price
      });
      return res.json({ item });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const items = await Item.findOneAndDelete({ Id: id });

    if (!items) {
      return res.sendStatus(404);
    }
    return res.send("Item deleted")
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/items', async (req, res) => {
  try {
    await Item.deleteMany();
    return res.send('All items deleted');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});


router.post('/register', userHandlers.register);

router.post('/login', userHandlers.sign_in);


router.get('/user', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete('/user', async (req, res) => {
  try {
    await User.deleteMany();
    return res.send('user deleted');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});


export default router;
