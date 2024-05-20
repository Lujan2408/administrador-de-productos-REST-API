import express from 'express';

const app = express();

// Routing
app.get('/', (req, res) => {

  const data = [
    {
      id: 1,
      name: 'Product 1',
      price: 10
    }
  ]

  res.json(data);
})

export default app;