import * as ProductService from '../services/product.service.js';

// Aplicando Clase 06: Asincronismo con try/catch
export const deleteProduct = async (req, res) => {
    // Aplicando Clase 04: Destructuring de parámetros
    const { id } = req.params;

    try {
        await ProductService.remove(id);
        
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

export const getProducts = async (req, res) => {
    try {
        const productos = await ProductService.getAll();
        // Uso de Template Literals (Clase 03) para loguear en el servidor
        console.log(`>>> Consulta exitosa: se recuperaron ${productos.length} productos.`);
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos" });
    }
};