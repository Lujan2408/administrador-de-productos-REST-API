import { Request, Response } from "express";
import Product from "../models/Product.model";
import colors from "colors";

// Siempre que interactuamos con un modelo, es necesario que la funcion sea asincrona 

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({ // Consultar todos los productos
      order: [['price', 'DESC']], 
      attributes: {exclude: ['createdAt', 'updatedAt', 'availability']} 
    }); 
    
    res.json({data: products}); 
  } catch (error) {
    console.log(colors.bgRed(error));
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id); // Consultar un producto por su id
    
    if (!product) {
      res.status(404).json({ 
        error: 'Producto no encontrado' 
      });
    }

    res.json({data: product});
  } catch (error) {
    console.log(colors.bgRed(error));
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body); // Insertar datos en la base de datos
    res.json({ data: product });
  } catch (error) {
    console.log(colors.bgRed(error));
  }
};

export const updateProduct = async (req: Request, res: Response) => {
    
    // Obtener el producto a actualizar
    const { id } = req.params;
    const product = await Product.findByPk(id); // Consultar un producto por su id
    
    // Validar si el producto existe
    if (!product) {
      res.status(404).json({ 
        error: 'Producto no encontrado' 
      });
    }

    res.json({ data: product });

    // Actualizar los datos del producto
    await product.update(req.body);
    await product.save();
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ 
        error: 'Producto no encontrado' 
      });
    }

    // Eliminar el producto de la base de datos
    await product.destroy();
    res.json({ data: 'Producto Eliminado' });
}