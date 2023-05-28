import { Router } from "express";
import Item from "../models/Item.js";


const router = Router();

router.get('/items', async (req, res) => {

    try {
        const items = await Item.find();
        res.json({items});
        return res.status(200);
        
    } catch (error) {
        console.log(error);  
        return res.status(500).json({ message: error.message });
    }
});

router.post('/items', async (req, res) => {

    try {
        const { Name, Price} = req.body;
        let item = await Item.findOne({Name});

        if(item){
            res.json({item});
            
        }else{
            item = await Item.create({
                Name, Price
            });
            res.json({item});
            return res.status(200);
           
        }
        
    } catch (error) {
        console.log(error);  
        return res.status(500).json({ message: error.message });
    }
});

router.delete('/items/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const items = await Item.findOneAndDelete({ Id: id }); // Use Id instead of _id

      if(!items){
        return res.sendStatus(404);
      }
      res.json({ items });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  });

router.delete('/items', async (req, res) => {
    try {
        // Logic to delete all items
        await Item.deleteMany();
        return res.send('All items deleted');
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
})

//router.post('/');
//.get('/');

export default router;