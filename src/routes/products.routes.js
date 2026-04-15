import { Router } from 'express';
import * as ProductController from '../controllers/products.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);

// Rutas protegidas
router.post('/crear', verifyToken, ProductController.createProduct);
router.delete('/:id', verifyToken, ProductController.deleteProduct);

export default router;