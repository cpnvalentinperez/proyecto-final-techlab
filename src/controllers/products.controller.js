import * as ProductService from '../services/products.service.js';
import fetch from 'node-fetch';

// Aplicando Clase 06: Asincronismo con try/catch
export const borrarProducto = async (req, res) => {
    // Aplicando Clase 04: Destructuring de parámetros
    const { id } = req.params;

    try {
        await ProductService.borrarProducto(id);
        
        // Mensaje alineado a la Clase 05
        res.status(200).json({
            status: 200,
            message: `El item con el id: ${id} se eliminó con éxito`
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error al intentar eliminar el producto",
            error: error.message
        });
    }
};

export const obtenerProductosExternos = async (req, res) => {
    try {
        console.log(">>> Iniciando consulta a FakeStoreAPI...");
        
        // Aplicando Clase 06: Uso de fetch con await
        const response = await fetch('https://fakestoreapi.com/products');
        
        // Validación de respuesta (Clase 07: Códigos de estado)
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();
        
        // Clase 03: Usando .slice() para no saturar la consola con 20 productos
        const pocosProductos = data.slice(0, 5);
        
        console.log(`>>> Se recuperaron ${pocosProductos.length} productos externos con éxito.`);
        
        res.status(200).json(pocosProductos);

    } catch (error) {
        // Manejo de errores con try/catch (Clase 06 - Misión 2)
        console.error("Hubo un problema al consumir la API externa:", error.message);
        res.status(500).json({ 
            status: 500, 
            message: "No se pudo sincronizar con FakeStoreAPI" 
        });
    }
};

export const obtenerProductos = async (req, res) => {
    try {
        const productos = await ProductService.fetchProductos();
        // Uso de Template Literals (Clase 03) para loguear en el servidor
        console.log(`>>> Consulta exitosa: se recuperaron ${productos.length} productos.`);
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

// Agregar en products.controller.js

export const obtenerProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await ProductService.fetchProducto(id);
        if (!producto) {
            return res.status(404).json({ status: 404, message: `Producto ${id} no encontrado` });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error: error.message });
    }
};

export const crearProducto = async (req, res) => {
    const body = req.body;
    try {
        const nuevo = await ProductService.guardarProducto(body);
        res.status(201).json({ status: 201, message: "Producto creado con éxito", data: nuevo });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error: error.message });
    }
};