import express from 'express';
import router from './routes';
import db from './config/db';
import colors from 'colors';

// Connect to the database
async function connectDb() {
    try {
      await db.authenticate();
      db.sync();
      console.log(colors.cyan('Conectado a la base de datos'));
    } catch (err) {
      console.log(err);
      console.log(colors.red.bold('No se pudo conectar a la base de datos'));
    }
}

connectDb();

const app = express();

app.use('/api/products', router); 

export default app;