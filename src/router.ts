import { Router } from "express" 
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "./handlers/product";
import { body, param } from 'express-validator'
import {handleErrors } from "./middleware";

const router = Router();

// Routing
router.get('/', getProducts);

router.get('/:id', 

  // Validar que sea un id válido
  param('id').isInt().withMessage('Id no válido'),
  handleErrors,
  getProductById
);

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
);

router.put('/:id', 

  // Validación 
  param('id').isInt().withMessage('Id no válido'),
  body('name')
  .trim()
  .notEmpty().withMessage('El nombre del producto no puede estar vacio o contener espacios en blanco'),

  body('price')
  .isNumeric().withMessage('Precio no válido')
  .notEmpty().withMessage('El precio del producto no puede estar vacio')
  .custom(value => value > 0).withMessage('El precio del producto no puede ser negativo'),

  body('availability') 
  .isBoolean().withMessage('Valor no válido'),
  handleErrors,
  updateProduct
);

router.delete('/:id', 
    param('id').isInt().withMessage('Id no válido'),
    handleErrors,
    deleteProduct
);

export default router;