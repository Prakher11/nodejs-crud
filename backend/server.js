import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 5005;
//const cors = require("cors");

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import itemRoutes from './routes/itemRoutes.js'
import authRoutes from './routes/authRoutes.js'
import connectDB from './config/db.js';
import db from './models/index.js';

const app = express();

var corsOptions = {
    origin: "http://localhost:5000"
  };

app.use(cors(corsOptions));

app.use(express.json());

//const db = require("./models");

const Role = db.role;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
      }
    });
  }

//require('./routes/authRoutes')(app);
app.use('/', authRoutes);
app.use('/', itemRoutes);

app.listen(PORT, () => {

    connectDB().then(() => {
        console.log(`Server is running on port: ${PORT}`);
    });
});
