import { Request, Response } from "express";
import Product from "../models/Product.model";

// Siempre que interactuamos con un modelo, es necesario que la funcion sea asincrona 

export const createProduct = async (req : Request, res : Response) => {
  
  // Insertar datos en la base de datos (1 forma)
  // const product = new Product(req.body);
  // const savedProduct = await product.save();

  // Insertar datos en la base de datos (2 forma)
  const product = await Product.create(req.body); 
  
  res.json({data: product});
}
