import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 5005;
const cors = require("cors");

import express from 'express';
import morgan from 'morgan';
import itemRoutes from './routes/itemRoutes.js'
import connectDB from './config/db.js';

const app = express();

var corsOptions = {
    origin: "http://localhost:5000"
  };

app.use(cors(corsOptions));

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/', itemRoutes);

app.listen(PORT, () => {

    connectDB().then(() => {
        console.log(`Server is running on port: ${PORT}`);
    });
});
