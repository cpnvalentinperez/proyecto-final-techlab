import * as ProductService from '../services/products.service.js';

export const getProducts = async (req, res) => {
    try {
        const products = await ProductService.fetchAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products" });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await ProductService.fetchProductById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product" });
    }
};

export const createProduct = async (req, res) => {
    try {
        if (!req.body.nombre || !req.body.precio) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newProduct = await ProductService.saveProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await ProductService.deleteProduct(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
};