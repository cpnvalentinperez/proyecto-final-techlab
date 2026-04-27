import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';

// Configuración de variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares según Clase 08
app.use(cors());
app.use(express.json()); // Usamos el estándar de express

// Rutas principales
app.use('/auth', authRoutes);
app.use('/api/productos', productRoutes);

// Manejo de rutas no encontradas - Estilo Clase 07
app.use((req, res) => {
    res.status(404).json({ 
        status: 404, 
        message: "Lo sentimos, el recurso solicitado no existe." 
    });
});

/**
 * LÓGICA CLI - Basada en el desafío de la Clase 05 (Pág. 25)
 * Captura comandos desde la terminal: npm run start GET products
 */
const [,, metodo, ruta, ...extras] = process.argv;

if (metodo) {
    console.log(`\n>>> Iniciando proceso de consulta CLI...`);
    
    // Aplicando lógica de métodos de strings (Clase 03)
    const accion = metodo.toUpperCase();
    
    if (accion === 'GET' && ruta === 'products') {
        console.log("Mostrando el listado completo de productos en stock.");
    } 
    else if (accion === 'POST' && ruta === 'products') {
        // Desestructuración de los extras (Clase 04)
        const [nombre, precio, ...descripcionArr] = extras;
        const descripcion = descripcionArr.join(" ");
        console.log(`Nuevo producto detectado: ${nombre}. Precio: $${precio}.`);
    } 
    else if (accion === 'DELETE' && ruta.includes('products/')) {
        const id = ruta.split('/')[1];
        // MENSAJE EXACTO solicitado en Clase 05, Pág 25:
        console.log(`El item con el id: ${id} se eliminó con éxito`);
    }

    process.exit(0); // Terminamos ejecución CLI
} else {
    // Inicio del servidor - Estilo Clase 02
    app.listen(PORT, () => {
        console.log(`-----------------------------------------`);
        console.log(`Servidor de TechLab activo en puerto ${PORT}`);
        console.log(`Listo para recibir peticiones HTTP`);
        console.log(`-----------------------------------------`);
    });
}