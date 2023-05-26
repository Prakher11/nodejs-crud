import { Router } from "express";

const router = Router();

router.get('/Items', async (req, res) => {

    try {
        res.json({items: [] });
        
    } catch (error) {
        console.log(error);  
    }
});

router.post('/');
router.delete('/');
router.post('/');
router.get('/');

export default router;