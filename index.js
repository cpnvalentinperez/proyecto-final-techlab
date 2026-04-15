import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import { verifyToken } from './src/middlewares/auth.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api/productos', productRoutes);

// Para proteger rutas específicas en products.routes.js, 
// puedes pasar verifyToken como middleware en el archivo de rutas.

app.use((req, res) => {
    res.status(404).json({ status: 404, message: "Resource not found" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});