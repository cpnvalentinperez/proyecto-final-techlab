import * as ProductModel from '../models/products.model.js';

export const fetchProductos = async () => {
    return await ProductModel.getAll();
};

export const fetchProducto = async (id) => {
    return await ProductModel.getById(id);
};

export const guardarProducto = async (productData) => {
    return await ProductModel.create(productData);
};

export const borrarProducto = async (id) => {
    return await ProductModel.remove(id);
};
