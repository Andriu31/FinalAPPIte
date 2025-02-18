import express from 'express';

import { getProducts, addProductImage, createProduct, searchProducto } from '../controller/ProductController.js';
import multer from 'multer';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/imagenes/productos')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null,  uniqueSuffix +"-"+file.originalname );
    }
  });
  var upload = multer({ storage: storage });

  const rotuer= express.Router();

rotuer.post('/crearproduct', createProduct);
rotuer.get('/verproduct', getProducts);
rotuer.post('/products/:id/image', upload.single('file'), addProductImage);
rotuer.post('/buscarproducto', searchProducto);

export default rotuer;