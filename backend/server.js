import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 5005;

import express from 'express';
import morgan from 'morgan';
import itemRoutes from './routes/itemRoutes.js'
import connectDB from './config/db.js';
import jsonwebtoken from 'jsonwebtoken';
import os from 'os';

const { cpus } = os;
process.env.UV_THREADPOOL_SIZE = cpus().length;

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else {
      req.user = undefined;
      next();
    }
  });

app.use(morgan('dev'));


app.use('/', itemRoutes);

app.listen(PORT, () => {

    connectDB().then(() => {
        console.log(`Server is running on port: ${PORT}`);
    });
});
