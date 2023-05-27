import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 5005;

import express from 'express';
import morgan from 'morgan';
import itemRoutes from './routes/itemRoutes.js'
import connectDB from './config/db.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/', itemRoutes);

app.listen(PORT, () => {

    connectDB().then(() => {
        console.log(`Server is running on port: ${PORT}`);
    });
});
