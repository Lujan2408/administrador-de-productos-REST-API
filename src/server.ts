import express from 'express';
import router from './routes';
import db from './config/db';

// Connect to the database
async function connectDb() {
    try {
      await db.authenticate();
      db.sync();
      console.log("Connected to database");
    } catch (err) {
      console.log(err);
      console.log("Error connecting to database");
    }
}

connectDb();

const app = express();

app.use('/api/products', router); 

export default app;