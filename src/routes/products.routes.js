import { Router } from 'express';
import * as ProductController from '../controllers/products.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Requerimiento: GET /api/productos - devuelve todos
router.get('/', ProductController.getProducts);

// Requerimiento: GET /api/productos/:id - devuelve uno por ID
router.get('/:id', ProductController.getProduct);

// Rutas protegidas
// Requerimiento: POST /api/productos/crear - guarda en la nube 
router.post('/crear', verifyToken, ProductController.createProduct);

// Requerimiento: DELETE /api/productos/:id - elimina por ID
router.delete('/:id', verifyToken, ProductController.deleteProduct);

export default router;
