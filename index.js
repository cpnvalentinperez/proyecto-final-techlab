import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware estándar (Clase 08)
app.use(cors());
app.use(express.json()); 

// Endpoints (Clase 07: Cómo funciona la web)
app.use('/auth', authRoutes);
app.use('/api/productos', productRoutes);

app.use((req, res) => {
    res.status(404).json({ 
        status: 404, 
        message: "Ups! El recurso que buscas no está por aquí." 
    });
});

/** * Lógica CLI - Misión Clase 05
 * Saltamos los primeros 2 argumentos de Node con [,, ...]
 */
const [,, metodo, ruta, ...extras] = process.argv;

if (metodo) {
    const operacion = metodo.toUpperCase();
    console.log(`\n--- Ejecutando comando de consola [${operacion}] ---`);

    if (operacion === 'GET' && ruta === 'products') {
        console.log("Acción: Listado general de productos solicitado.");
    } 
    else if (operacion === 'DELETE' && ruta.includes('products/')) {
        const id = ruta.split('/')[1];        
        console.log(`El item con el id: ${id} se eliminó con éxito`);
    } 
    else if (operacion === 'POST' && ruta === 'products') {
        // Uso de Spread/Rest (Clase 04)
        const [nombre, precio, ...resto] = extras;
        console.log(`Acción: Creando producto '${nombre}' por valor de $${precio}`);
    }

    process.exit(0);
} else {
    app.listen(PORT, () => {
        console.log(`=========================================`);
        console.log(` TechLab Backend - Servidor Activo `);
        console.log(` URL: http://localhost:${PORT} `);
        console.log(`=========================================`);
    });
}