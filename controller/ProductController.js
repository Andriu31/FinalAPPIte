import { ProductModel } from "../models/ProductModel.js";
import { Op } from "sequelize";


export const createProduct = async (req, res) => {
    try {
      const { codigo, nombre, descripcion, precio, cantidad_en_stock, categoria } = req.body;
  
      // Verificar si todos los campos obligatorios están presentes
      if (!codigo || !nombre || !precio || !categoria || !cantidad_en_stock) {
        return res.status(400).json({ message: "Todos los campos obligatorios deben ser completados" });
      }
  
      // Crear el producto en la base de datos
      const producto = await ProductModel.create({
        codigo,
        nombre,
        descripcion,
        precio,
        cantidad_en_stock,
        categoria,
      });
  
      res.status(201).json({ message: "Producto creado exitosamente", producto: { id: producto.id } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const getProducts = async (req, res) => {
    try {
      // Obtener todos los productos de la base de datos
      const productos = await ProductModel.findAll();
  
      if (productos.length === 0) {
        return res.status(404).json({ message: "No se encontraron productos" });
      }
  
      // Devolver la lista de productos
      res.status(200).json({ message: "Productos obtenidos exitosamente", productos });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const addProductImage = async (req, res) => {
    const { id } = req.params; // ID del producto
    const file = req.file; // Archivo de imagen cargado
  
    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }
  
    try {
      // Buscar el producto en la base de datos por su ID
      const product = await ProductModel.findOne({ where: { id } });
      if (product) {
        // Actualizar el campo 'image' del producto con el nombre del archivo
        product.set({
          ...product,
          foto: file.filename,
        });
        await product.save(); // Guardar los cambios en la base de datos
  
        return res.status(200).json({ message: "Image added to product successfully" });
      } else {
        // Si el producto no se encuentra
        return res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred while adding the image to the product" });
    }
  };


  export const searchProducto = async (req, res) => {
    try {
      const { dato } = req.body;
  
      /*
      // Preparamos el objeto de búsqueda
      let searchConditions = {};
  
      // Si 'nombre' es proporcionado, agregar la condición de búsqueda por nombre
      if (dato) {
        searchConditions.nombre = { [Op.like]: `%${dato}%` };
      }*/

  
  
      // Buscar productos con las condiciones especificadas
      
      const productos = await ProductModel.findAll({
        where: {
          [Op.or]: [
            { nombre: { [Op.like]: `%${dato}%` } },
            { categoria: { [Op.like]: `%${dato}%` } }
          ]
        }
      });
  
      // Retornar los productos encontrados
      res.status(200).json({ productos });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error al buscar producto' });
    }
  };