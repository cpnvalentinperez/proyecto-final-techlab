import { Router } from 'express';
import * as ProductController from '../controllers/products.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Endpoint para demostrar uso de Fetch API
router.get('/externos', ProductController.obtenerProductosExternos);

// Requerimiento: GET /api/productos - devuelve todos
router.get('/', ProductController.obtenerProductos);

// Requerimiento: GET /api/productos/:id - devuelve uno por ID
router.get('/:id', ProductController.obtenerProducto);

// Rutas protegidas
// Requerimiento: POST /api/productos/crear - guarda en la nube 
router.post('/crear', verifyToken, ProductController.crearProducto);

// Requerimiento: DELETE /api/productos/:id - elimina por ID
router.delete('/:id', verifyToken, ProductController.borrarProducto);

export default router;
