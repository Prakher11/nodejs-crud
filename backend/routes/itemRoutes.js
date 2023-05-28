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
        const items = await Item.create({
            Name, Price
        });
        res.json({items});
        
    } catch (error) {
        console.log(error);  
    }
});
router.delete('/items/:id', async (req, res) => {

    try {
        const { id } =req.params;
        const items = await Item.findById(id);
        await items.delete();
        res.json({items});
        
    } catch (error) {
        console.log(error);  
    }
});

//router.post('/');
//.get('/');

export default router;