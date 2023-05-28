import { Router } from "express";
import Item from "../models/Item.js";


const router = Router();

router.get('/items', async (req, res) => {

    try {
        const items = await Item.find();
        res.json({items});
        
    } catch (error) {
        console.log(error);  
    }
});

router.post('/items', async (req, res) => {

    try {
        const { Name, Price} = req.body;
        let item = await Item.findOne({Name});

        if(item){
            res.json({items});
        }else{
            item = await Item.create({
                Name, Price
            });
            res.json({item});
        }
        
    } catch (error) {
        console.log(error);  
    }
});

router.delete('/items/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const items = await Item.findOneAndDelete({ Id: id }); // Use Id instead of _id
      res.json({ items });
    } catch (error) {
      console.log(error);
    }
  });

//router.post('/');
//.get('/');

export default router;