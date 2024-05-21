import { Request, Response } from "express";
import Product from "../models/Product.model";
import { check, validationResult } from 'express-validator';


// Siempre que interactuamos con un modelo, es necesario que la funcion sea asincrona 
export const createProduct = async (req : Request, res : Response) => {
  
  // Validar datos
  await check('name').trim().notEmpty().withMessage('El nombre del producto no puede estar vacio o contener espacios en blanco').run(req); 
  
  await check('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio del producto no puede estar vacio')
    .custom(value => value > 0).withMessage('El precio del producto no puede ser negativo')
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  // Insertar datos en la base de datos
  const product = await Product.create(req.body); 
  
  res.json({data: product});
}
