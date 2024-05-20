import express from 'express';
import router from './routes';

const app = express();

app.use('/api/products', router); 

export default app;