import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 5005;

import express from 'express';
import morgan from 'morgan';
import itemRoutes from './routes/itemRoutes.js'

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/', itemRoutes);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`))