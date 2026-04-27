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

// Registro de las rutas del Requerimiento #4
app.use('/auth', authRoutes);
app.use('/api/productos', productRoutes);

// Para proteger rutas específicas en products.routes.js, 
// puedes pasar verifyToken como middleware en el archivo de rutas.

app.use((req, res) => {
    res.status(404).json({ status: 404, message: "Resource not found" });
});

// --- LÓGICA PARA REQUERIMIENTO #2 ---
const args = process.argv.slice(2);

if (args.length > 0) {
    // Si hay argumentos, ejecutamos la lógica de consola y NO levantamos el servidor
    const [metodo, ruta, ...detalles] = args;

    console.log(`\n--- Ejecución de Comando CLI ---`);
    console.log(`Método: ${metodo}`);
    console.log(`Ruta: ${ruta}`);

    if (metodo === 'GET' && ruta === 'products') {
        console.log("Acción: Listando todos los productos...");
        // Aquí podrías importar y llamar a tu controlador directamente si quisieras los datos reales
    } else if (metodo === 'GET' && ruta.startsWith('products/')) {
        const id = ruta.split('/')[1];
        console.log(`Acción: Obteniendo producto con ID: ${id}`);
    } else if (metodo === 'POST' && ruta === 'products') {
        console.log(`Acción: Creando producto -> Nombre: ${detalles[0]}, Precio: ${detalles[1]}, Descripción: ${detalles[2]}`);
    } else if (metodo === 'DELETE' && ruta.startsWith('products/')) {
        const id = ruta.split('/')[1];
        console.log(`Acción: Eliminando producto con ID: ${id}`);
    } else {
        console.log("Comando no reconocido o formato incorrecto.");
    }
    
    console.log(`--------------------------------\n`);
    // Finalizamos la ejecución para que no se quede colgado esperando el servidor
    process.exit(0);

} else {
    // Si NO hay argumentos, el programa funciona como servidor web normal
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
        console.log(`Esperando peticiones HTTP...`);
    });
}

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Server running on port ${PORT}`);
});