import { Router } from "express" 
import { createProduct, getProducts } from "./handlers/product";
import { body } from 'express-validator'
import {handleErrors } from "./middleware";

const router = Router();

// Routing
router.get('/', getProducts);

router.post('/', 

  // Validar datos desde el router 
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre del producto no puede estar vacio o contener espacios en blanco'),
  
  body('price')
    .isNumeric().withMessage('Valor no válido')
    .notEmpty().withMessage('El precio del producto no puede estar vacio')
    .custom(value => value > 0).withMessage('El precio del producto no puede ser negativo'),
  handleErrors,
  createProduct
)

router.put('/', (req, res) => {
  res.json("Desde put");
})

router.patch('/', (req, res) => {
  res.json("Desde patch");
})

router.delete('/', (req, res) => {
  res.json("Desde delete");
})

export default router;