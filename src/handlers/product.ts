import { Request, Response } from "express";
import Product from "../models/Product.model";


// Siempre que interactuamos con un modelo, es necesario que la funcion sea asincrona 
export const createProduct = async (req : Request, res : Response) => {

  // Insertar datos en la base de datos
  const product = await Product.create(req.body); 
  
  res.json({data: product});
}
